# Main Section Detector

Detects `<main>` HTML elements as structural sections for page layout namespacing.

## Purpose

The main section serves as a namespace container, grouping all elements within a `<main>` tag under a common parent in the parsed tree. This is useful for distinguishing primary content from sidebars, headers, and footers.

## Example HTML

```html
<main>
  <article>
    <!-- Article content -->
  </article>
  <section class="form-section">
    <!-- Form content -->
  </section>
</main>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element
```

## Example Output

```json
{
  "type": "section",
  "kind": "main-section",
  "path": "main",
  "meta": {},
  "children": [
    // Detected children within the main element
  ]
}
```

## Meta Fields

This detector has no meta fields - it is a pure structural container.

## Detection Rules

1. Element must be a `<main>` tag

## Child Detection

All direct and nested children of the `<main>` element are recursively parsed for detectable components.
