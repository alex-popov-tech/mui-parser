# Output

```json
{
  "type": "field",
  "kind": "image-field",
  "path": "[class^=\"ImageField\"]",
  "meta": {
    "input": "input[type=\"file\"]",
    "img": "img"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for the hidden file input (relative to `path`). Used for uploading files programmatically. |
| `img` | string | Selector for the preview image (relative to `path`). Used to assert upload completion — image becomes visible after successful upload. |
