# mui-parser

Parses MUI form HTML into structured JSON for Playright page object generation.

## What It Does

```
HTML (MUI forms) → Structured JSON → Ready for Playright page objects
                   ↑ this tool
```

Extracts form sections and fields from Material-UI HTML, producing a tree of nodes with Playright-ready CSS selectors.

> **Note:** Playright is a wrapper around Playwright, providing extended APIs and new features.

## Usage

### CLI Commands

```bash
# Parse file → stdout
npx tsx src/cli.ts page.html

# Parse file → file
npx tsx src/cli.ts page.html -o output.json

# stdin → stdout
cat page.html | npx tsx src/cli.ts
```

### Input Example

```html
<main>
  <section class="FormSection_wrapper__abc">
    <h2 class="FormSection_title__def">Settings</h2>
    <div class="FormSection_bodyWrapper__xyz">
      <div class="FormSection_body__123">
        <div data-testid="form-field-wrapper">
          <label data-testid="toggle-field" class="MuiFormControlLabel-root">
            <span class="MuiSwitch-root">
              <span class="MuiSwitch-switchBase">
                <input type="checkbox" name="enabled" />
              </span>
            </span>
            <span class="MuiFormControlLabel-label">Enable Feature</span>
          </label>
        </div>
        <div data-testid="form-field-wrapper">
          <div data-testid="text-field" class="MuiTextField-root">
            <div class="MuiInputBase-root">
              <input type="text" name="title" class="MuiInputBase-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
```

### Output

```json
{
  "type": "section",
  "kind": "root",
  "path": "main",
  "children": [
    {
      "type": "section",
      "kind": "form-section",
      "path": "section[class*=\"FormSection_wrapper__\"]:has(h2:text-is(\"Settings\"))",
      "meta": {
        "title": "h2[class*=\"FormSection_title__\"]",
        "body": "div[class*=\"FormSection_body__\"]",
        "fields": "[data-testid=\"form-field-wrapper\"]"
      },
      "children": [
        {
          "type": "field",
          "kind": "toggle-field",
          "path": "[data-testid=\"toggle-field\"]:has(input[name=\"enabled\"])",
          "meta": {
            "input": "input[name=\"enabled\"]"
          }
        },
        {
          "type": "field",
          "kind": "text-field",
          "path": "[data-testid=\"text-field\"]:has(input[name^=\"title\"])",
          "meta": {
            "input": "input[name^=\"title\"]"
          }
        }
      ]
    }
  ]
}
```

## Output Format

```typescript
interface GatheredNode {
  type: "section" | "field";
  kind: string;               // Detector name (e.g., "form-section", "text-field")
  path: string;               // Playright CSS selector for root element
  meta?: object;              // Kind-specific sub-element selectors
  children?: GatheredNode[];  // Nested nodes (sections only)
}
```

## Component Documentation

Each detector provides three focused docs:

| Doc | Purpose |
|-----|---------|
| `output.md` | JSON structure and meta field meanings |
| `usage.md` | Playright locator snippets |
| `html.md` | Example HTML patterns recognized |

**Example: toggle-field**

```html
<!-- html.md excerpt -->
<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root">
    <input class="MuiSwitch-input" name="featured" type="checkbox">
  </span>
  <span class="MuiFormControlLabel-label">Featured</span>
</label>
```

```json
// output.md - JSON produced
{
  "type": "field",
  "kind": "toggle-field",
  "path": "label[data-testid=\"toggle-field\"]:has(input[name=\"featured\"])",
  "meta": { "input": "input[name=\"featured\"]" }
}
```

```typescript
// usage.md - Playright usage (placeholders replaced during page object generation)

// HOW TO LOCATE
const container = stage.locateBy('{path}');   // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
await container.locateBy('{path}').click();
```

## Supported Components

### Sections (containers with children)

| Kind | Detects | Output | Usage | HTML |
|------|---------|:------:|:-----:|:----:|
| `main-section` | `<main>` elements | [→](./src/detectors/main-section/doc/output.md) | [→](./src/detectors/main-section/doc/usage.md) | [→](./src/detectors/main-section/doc/html.md) |
| `aside-section` | `<aside>` elements | [→](./src/detectors/aside-section/doc/output.md) | [→](./src/detectors/aside-section/doc/usage.md) | [→](./src/detectors/aside-section/doc/html.md) |
| `form-section` | Form groups with headings | [→](./src/detectors/form-section/doc/output.md) | [→](./src/detectors/form-section/doc/usage.md) | [→](./src/detectors/form-section/doc/html.md) |
| `dnd-area-section` | Drag-and-drop drop zones | [→](./src/detectors/dnd-area-section/doc/output.md) | [→](./src/detectors/dnd-area-section/doc/usage.md) | [→](./src/detectors/dnd-area-section/doc/html.md) |
| `dnd-item-section` | Draggable items | [→](./src/detectors/dnd-item-section/doc/output.md) | [→](./src/detectors/dnd-item-section/doc/usage.md) | [→](./src/detectors/dnd-item-section/doc/html.md) |

### Fields (leaf nodes)

| Kind | Detects | Output | Usage | HTML |
|------|---------|:------:|:-----:|:----:|
| `text-field` | MUI TextField | [→](./src/detectors/text-field/doc/output.md) | [→](./src/detectors/text-field/doc/usage.md) | [→](./src/detectors/text-field/doc/html.md) |
| `toggle-field` | MUI Switch/Checkbox | [→](./src/detectors/toggle-field/doc/output.md) | [→](./src/detectors/toggle-field/doc/usage.md) | [→](./src/detectors/toggle-field/doc/html.md) |
| `select-field` | MUI Select dropdown | [→](./src/detectors/select-field/doc/output.md) | [→](./src/detectors/select-field/doc/usage.md) | [→](./src/detectors/select-field/doc/html.md) |
| `date-field` | MUI DatePicker | [→](./src/detectors/date-field/doc/output.md) | [→](./src/detectors/date-field/doc/usage.md) | [→](./src/detectors/date-field/doc/html.md) |
| `autocomplete-field` | MUI Autocomplete | [→](./src/detectors/autocomplete-field/doc/output.md) | [→](./src/detectors/autocomplete-field/doc/usage.md) | [→](./src/detectors/autocomplete-field/doc/html.md) |
| `text-editor-field` | Rich text editor (Froala) | [→](./src/detectors/text-editor-field/doc/output.md) | [→](./src/detectors/text-editor-field/doc/usage.md) | [→](./src/detectors/text-editor-field/doc/html.md) |
| `image-field` | File upload with preview | [→](./src/detectors/image-field/doc/output.md) | [→](./src/detectors/image-field/doc/usage.md) | [→](./src/detectors/image-field/doc/html.md) |
| `button-field` | MUI Button | [→](./src/detectors/button-field/doc/output.md) | [→](./src/detectors/button-field/doc/usage.md) | [→](./src/detectors/button-field/doc/html.md) |
| `cta-button-link` | CTA button composite | [→](./src/detectors/cta-button-link/doc/output.md) | [→](./src/detectors/cta-button-link/doc/usage.md) | [→](./src/detectors/cta-button-link/doc/html.md) |

## For AI Agents

- Output is a tree of `GatheredNode` objects
- `path` = Playright-ready CSS selector to locate the component
- `meta` = relative selectors for sub-elements within the component
- All types exported from [`src/detectors/index.ts`](./src/detectors/index.ts)

### Type imports

```typescript
import type {
  GatheredNode,
  TextFieldNode,
  ToggleFieldNode,
  FormSectionNode,
  // ... all 14 detector node types
} from "./src/detectors";
```

## Development

```bash
npm test          # Run tests
npm run typecheck # Type check
npm run lint      # Lint
```

- Architecture: [PLAN.md](./PLAN.md)
- Add detectors: `/create-detector` skill

## License

[MIT](./LICENSE)
