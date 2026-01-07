# Output

```json
{
  "type": "field",
  "kind": "text-editor-field",
  "path": "div[data-testid=\"text-editor-field\"]:has(label:contains(\"Date and Venue Info\"))",
  "meta": {
    "label": "label.MuiFormLabel-root",
    "editor": "div.fr-element.fr-view[contenteditable=\"true\"]",
    "helperText": "p.MuiFormHelperText-root"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Selector for the label element (relative to `path`). Read text content to get field name. |
| `editor` | string | Selector for the contenteditable editor element (relative to `path`). This is the Froala editor's editable area. |
| `helperText` | string | Selector for the helper/error text element (relative to `path`). |
