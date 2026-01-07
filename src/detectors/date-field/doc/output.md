# Output Schema

```json
{
  "type": "field",
  "kind": "date-field",
  "path": ".MuiTextField-root:has(input[data-testid=\"date-field\"][name^=\"date.start\"])",
  "meta": {
    "input": "input[name^=\"date.start\"]"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                        |
| ------- | ------ | -------------------------------------------------- |
| `input` | string | Selector for the date input element (relative to `path`) |
