# Output

```json
{
  "type": "field",
  "kind": "toggle",
  "path": "[data-testid=\"toggle-field\"]:has(input[name=\"featured\"])",
  "meta": {
    "input": "input[name=\"featured\"]",
    "label": "Featured"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                      |
|---------|--------|--------------------------------------------------|
| `input` | string | Selector for checkbox input (relative to `path`) |
| `label` | string | The toggle's text label                          |
