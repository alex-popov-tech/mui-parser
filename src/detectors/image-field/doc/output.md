# Output

```json
{
  "type": "field",
  "kind": "image-field",
  "path": "div[class*=\"ImageField_wrapper\"]:has-text(\"Logo\")",
  "meta": {
    "label": "label.MuiInputLabel-root",
    "preview": "img[class*=\"ImagePreview_previewImage\"]",
    "fileInput": "input[data-testid=\"file-input\"]",
    "uploadButton": "[data-testid=\"file-change-action\"]",
    "removeButton": "[data-testid=\"file-remove-action\"]"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Selector for the label element (relative to `path`). Read text content for field name. |
| `preview` | string | Selector for the preview image (relative to `path`). Only exists when image is uploaded. |
| `fileInput` | string | Selector for the hidden file input (relative to `path`). Used for programmatic uploads. |
| `uploadButton` | string | Selector for the upload/change button (relative to `path`). |
| `removeButton` | string | Selector for the remove button (relative to `path`). Only exists when image is uploaded. |
