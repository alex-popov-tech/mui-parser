# HTML Field Parser - Project Plan

## Motivation

Converting real web page HTML to Playwright page objects is tedious and error-prone. This tool automates the first step: extracting structured information about form sections and fields from HTML.

**Pipeline vision:**
```
Phase 1 (this tool)     Phase 2                 Phase 3
HTML ──────────────────> Gathered JSON ─────────> Page Objects ─────────> Codebase
     html-field-parser        (future)                (future)
```

This document covers Phase 1 only.

---

## High-Level Architecture

### Core Concept: Directed Traversal with Detectors

```
┌─────────────────────────────────────────────────────────────────┐
│                         Parser                                  │
│  parseHtml(html) ──> parseInto(el, parent, $, path, siblings)  │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
              ┌───────────────────┴───────────────────┐
              │         Detector Registry             │
              │  Run ALL detectors, panic if >1 match │
              └───────────────────┬───────────────────┘
                                  │
        ┌─────────────┬───────────┴───────────┬─────────────┐
        ▼             ▼                       ▼             ▼
   ┌─────────┐   ┌─────────┐           ┌─────────┐   ┌─────────┐
   │ toggle  │   │ select  │    ...    │ section │   │ dnd-list│
   │ detector│   │ detector│           │ detector│   │ detector│
   └─────────┘   └─────────┘           └─────────┘   └─────────┘
```

### Key Design Principles

1. **Single `detect()` method** - No separate match/parse phases
2. **Run ALL detectors** - Panic if multiple match (safety net)
3. **Directed traversal** - Detectors return `childContainers` to traverse
4. **Transparent elements** - Unmatched elements pass through to children
5. **Path tracking** - Every node knows its location for debugging

---

## Node Schema

### GatheredNode

```typescript
interface GatheredNode {
  type: 'section' | 'field';  // Required - discriminator
  kind: string;               // Required - detector name (e.g., 'toggle', 'form-section')
  path: string;               // Required - debug path (e.g., 'root > form-section[0] > toggle[1]')
  label?: string;             // Optional - human-readable label
  meta?: object;              // Optional - type-specific data (schema per kind)
  children?: GatheredNode[];  // Optional - nested nodes (sections only)
}
```

### Rules

- `type`, `kind`, `path` - ALWAYS present
- `label` - Only if found (omit if not)
- `meta` - Only if non-empty (omit if empty)
- `children` - Only for sections with children (omit for fields)

---

## Detector Interface

```typescript
interface DetectionResult {
  node: GatheredNode;          // Fully populated node with meta
  childContainers: Element[];  // Specific elements to traverse for children
}

interface Detector {
  name: string;  // Unique identifier (e.g., 'toggle', 'form-section')
  detect(el: Element, $: CheerioAPI): DetectionResult | null;
}
```

### Example: Toggle Detector

```typescript
// src/detectors/toggle.ts
import type { Detector } from '../types';

export const toggleDetector: Detector = {
  name: 'toggle',

  detect(el, $) {
    // Check if this element matches
    if ($(el).attr('data-testid') !== 'toggle-field') {
      return null;
    }

    // Extract all relevant data
    const input = $(el).find('input[type="checkbox"]');
    const labelText = $(el).find('.MuiFormControlLabel-label').text().trim();

    return {
      node: {
        type: 'field',
        kind: 'toggle',
        path: '',  // Filled by parser
        ...(labelText && { label: labelText }),
        meta: {
          switch: {
            name: input.attr('name'),
            testId: 'toggle-field'
          }
        }
      },
      childContainers: []  // Fields have no children
    };
  }
};
```

### Example: Form Section Detector

```typescript
// src/detectors/form-section.ts
import type { Detector } from '../types';

export const formSectionDetector: Detector = {
  name: 'form-section',

  detect(el, $) {
    const className = $(el).attr('class') || '';
    if (!className.includes('FormSection_wrapper')) {
      return null;
    }

    const title = $(el).find('h2[class*="FormSection_title"]').first().text().trim();

    // Find exactly where children are
    const fieldWrappers = $(el)
      .find('[data-testid="form-field-wrapper"], [data-testid="dnd-droppable-area"]')
      .toArray();

    return {
      node: {
        type: 'section',
        kind: 'form-section',
        path: '',  // Filled by parser
        ...(title && { label: title })
      },
      childContainers: fieldWrappers
    };
  }
};
```

---

## Parser Algorithm

```typescript
// src/parser.ts
import * as cheerio from 'cheerio';
import { detectors } from './detectors';

export function parseHtml(html: string): GatheredNode {
  const $ = cheerio.load(html);
  const root: GatheredNode = {
    type: 'section',
    kind: 'root',
    path: 'root'
  };

  const siblingCounts = new Map<string, number>();
  parseInto($.root().children().first().get(0), root, $, 'root', siblingCounts);

  return root;
}

function parseInto(
  el: Element,
  parent: GatheredNode,
  $: CheerioAPI,
  parentPath: string,
  siblingCounts: Map<string, number>
): void {
  // Run ALL detectors
  const matches = detectors
    .map(d => ({ name: d.name, result: d.detect(el, $) }))
    .filter(m => m.result !== null);

  // Panic if multiple match
  if (matches.length > 1) {
    const names = matches.map(m => m.name).join(', ');
    throw new Error(`Multiple detectors matched at "${parentPath}": [${names}]`);
  }

  if (matches.length === 1) {
    const { node, childContainers } = matches[0].result!;

    // Build path with sibling index
    const index = siblingCounts.get(node.kind) || 0;
    siblingCounts.set(node.kind, index + 1);
    node.path = `${parentPath} > ${node.kind}[${index}]`;

    // Attach to parent
    parent.children = parent.children || [];
    parent.children.push(node);

    // Parse children from specific containers
    const childSiblingCounts = new Map<string, number>();
    for (const container of childContainers) {
      parseInto(container, node, $, node.path, childSiblingCounts);
    }
  } else {
    // Transparent element - parse children into same parent
    $(el).children().each((_, child) => {
      parseInto(child, parent, $, parentPath, siblingCounts);
    });
  }
}
```

---

## Input/Output Examples

### Input HTML

```html
<main class="ApplicationLayout_main">
  <form>
    <section class="FormSection_wrapper__abc">
      <h2 class="FormSection_title__def">Header Settings</h2>
      <div class="FormSection_body__ghi">
        <div data-testid="form-field-wrapper">
          <label data-testid="toggle-field" class="MuiFormControlLabel-root">
            <span class="MuiSwitch-root">
              <input type="checkbox" name="headerEnabled" />
            </span>
            <span class="MuiFormControlLabel-label">Enable Header</span>
          </label>
        </div>
        <div data-testid="form-field-wrapper">
          <div data-testid="select-field" class="MuiOutlinedInput-root">
            <input name="headerVariant" value="DEFAULT" />
            <label>Header Variant</label>
          </div>
        </div>
      </div>
    </section>
  </form>
</main>
```

### Output JSON

```json
{
  "type": "section",
  "kind": "root",
  "path": "root",
  "children": [
    {
      "type": "section",
      "kind": "form-section",
      "path": "root > form-section[0]",
      "label": "Header Settings",
      "children": [
        {
          "type": "field",
          "kind": "toggle",
          "path": "root > form-section[0] > toggle[0]",
          "label": "Enable Header",
          "meta": {
            "switch": {
              "name": "headerEnabled",
              "testId": "toggle-field"
            }
          }
        },
        {
          "type": "field",
          "kind": "select",
          "path": "root > form-section[0] > select[0]",
          "label": "Header Variant",
          "meta": {
            "trigger": {
              "name": "headerVariant",
              "testId": "select-field"
            }
          }
        }
      ]
    }
  ]
}
```

---

## Project Structure

```
html-field-parser/
├── src/
│   ├── cli.ts                    # CLI entry point
│   ├── parser.ts                 # Core parsing logic
│   ├── types.ts                  # TypeScript interfaces
│   └── detectors/
│       ├── index.ts              # Exports all detectors (empty initially)
│       └── ... (detectors added as needed)
├── tests/
│   ├── helpers.ts                # Test utilities (createContext, etc.)
│   ├── parser.test.ts            # Parser unit tests
│   ├── cli.test.ts               # CLI integration tests
│   ├── detectors/
│   │   ├── toggle.test.ts        # One file per detector
│   │   ├── select.test.ts
│   │   └── form-section.test.ts
│   └── fixtures/
│       └── full-form.html        # Large real HTML for integration
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── biome.json
└── vitest.config.ts
```

---

## Tooling

| Tool | Purpose |
|------|---------|
| **npm** | Package manager |
| **tsx** | TS execution |
| **commander** | CLI parsing |
| **vitest** | Testing with snapshots |
| **biome** | Lint + Format |
| **tsc** | Type checking |
| **tsup** | Build |
| **cheerio** | HTML parsing |

### package.json

```json
{
  "name": "html-field-parser",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "html-field-parser": "./dist/cli.js"
  },
  "main": "./dist/cli.js",
  "module": "./dist/cli.mjs",
  "types": "./dist/cli.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:update": "vitest run --update",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "typecheck": "tsc --noEmit",
    "check": "npm run typecheck && npm run lint && npm run test"
  },
  "dependencies": {
    "cheerio": "latest",
    "commander": "latest"
  },
  "devDependencies": {
    "@biomejs/biome": "latest",
    "@types/node": "latest",
    "tsup": "latest",
    "tsx": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

---

## CLI Interface

```bash
# Basic usage
npx tsx src/cli.ts input.html

# Output to file
npx tsx src/cli.ts input.html -o output.json

# From stdin (pipe)
cat page.html | npx tsx src/cli.ts

# After build/install
html-field-parser input.html
```

---

## Testing Strategy

### Test Structure

```
tests/
├── helpers.ts                # createContext() and utilities
├── parser.test.ts            # Core parser tests
├── cli.test.ts               # CLI integration tests
└── detectors/
    ├── toggle.test.ts        # Inline fixtures, one file per detector
    ├── select.test.ts
    └── form-section.test.ts
```

### Detector Tests (Inline Fixtures)

```typescript
// tests/detectors/toggle.test.ts
import { describe, it, expect } from 'vitest';
import { toggleDetector } from '../../src/detectors/toggle';
import { createContext } from '../helpers';

const TOGGLE_HTML = `
<label data-testid="toggle-field" class="MuiFormControlLabel-root">
  <span class="MuiSwitch-root">
    <input type="checkbox" name="headerEnabled" />
  </span>
  <span class="MuiFormControlLabel-label">Enable Header</span>
</label>
`;

const SELECT_HTML = `
<div data-testid="select-field" class="MuiOutlinedInput-root">
  <input name="variant" />
</div>
`;

describe('toggle detector', () => {
  it('detects toggle field', () => {
    const { el, $ } = createContext(TOGGLE_HTML);
    const result = toggleDetector.detect(el, $);

    expect(result).toMatchSnapshot();
  });

  it('returns null for non-toggle elements', () => {
    const { el, $ } = createContext(SELECT_HTML);
    const result = toggleDetector.detect(el, $);

    expect(result).toBeNull();
  });
});
```

### Test Helper

```typescript
// tests/helpers.ts
import * as cheerio from 'cheerio';

export function createContext(html: string) {
  const $ = cheerio.load(html);
  const el = $.root().children().first().get(0);
  return { el, $ };
}
```

---

## Error Handling

### Multiple Detector Match

```
Error: Multiple detectors matched at "root > form-section[0]": [dropdown, autocomplete-select]
```

### Invalid HTML

```
Error: Invalid HTML: no root element found
```

### Detector Behavior

Detectors should never throw - they return `null` if they can't handle an element.

---

## Code Style Guidelines

1. **No nulls in output** - Use optional fields (omit if empty)
2. **No throwing in detectors** - Return `null` for non-matches
3. **Explicit over magic** - Pass `$` as parameter
4. **Inline fixtures** - Keep test data close to tests
5. **Snapshot for structure** - Use snapshots for full output
6. **Descriptive errors** - Include path in error messages

---

## Detectors to Implement

### Fields
- [ ] `toggle` - Switch/checkbox with label
- [ ] `select` - Dropdown select
- [ ] `image-upload` - File upload with preview
- [ ] `text-input` - Basic text field
- [ ] `autocomplete` - Searchable select

### Sections
- [ ] `form-section` - FormSection_wrapper pattern
- [ ] `dnd-list` - Drag-and-drop list container
- [ ] `dnd-item` - Individual draggable item

---

## Future Considerations (Out of Scope)

- **Phase 2**: Identifier generation from gathered nodes
- **Phase 3**: Page object code generation
- **Schema validation**: JSON Schema for meta per kind
- **Watch mode**: Re-parse on file change
