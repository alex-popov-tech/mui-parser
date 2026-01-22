# Output

```json
{
  "type": "field",
  "kind": "select-field",
  "path": "[data-testid=\"select-field\"]:has(input[name=\"type\"])",
  "meta": {
    "input": "input[name=\"type\"]",
    "options": "[role=\"presentation\"]#menu-type [role=\"option\"]"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for hidden input holding the value (relative to `path`) |
| `options` | string | Selector for dropdown option items (absolute, at document root) |
