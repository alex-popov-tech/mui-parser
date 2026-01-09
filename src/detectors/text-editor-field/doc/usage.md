# Playwright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
await container.locateBy('{meta.editor}').fill('...');

// HOW TO READ LABEL (when present)
if (meta.label) {
  const labelText = await container.locateBy('{meta.label}').textContent();
}
```

**Note:** The `meta.label` field is optional. For labelless text-editor-fields (common in single-field sections), the parent section title serves as the label instead.
