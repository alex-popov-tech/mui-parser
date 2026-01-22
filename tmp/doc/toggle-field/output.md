# Output

```json
{
  "type": "field",
  "kind": "toggle",
  "path": "label[data-testid=\"toggle-field\"]:has(input[name=\"featured\"])",
  "meta": {
    "input": "input[name=\"featured\"]",
    "label": ".MuiFormControlLabel-label"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                        |
|---------|--------|----------------------------------------------------|
| `input` | string | Selector for checkbox input (relative to `path`)   |
| `label` | string | Selector for label element (relative to `path`)    |
