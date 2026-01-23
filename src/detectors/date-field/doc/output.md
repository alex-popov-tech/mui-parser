# Output Schema

## Simple Name (exact match)

```json
{
  "type": "field",
  "kind": "date-field",
  "path": ".MuiTextField-root:has(input[data-testid=\"date-field\"][name=\"birthDate\"])",
  "meta": {
    "input": "input[name=\"birthDate\"]",
    "label": "Birth Date"
  }
}
```

## Dotted Name (prefix match)

```json
{
  "type": "field",
  "kind": "date-field",
  "path": ".MuiTextField-root:has(input[data-testid=\"date-field\"][name^=\"date\"])",
  "meta": {
    "input": "input[name^=\"date\"]",
    "label": "Start Date"
  }
}
```

## Meta Fields

| Field   | Type    | Description                                        |
| ------- | ------- | -------------------------------------------------- |
| `input` | string  | Selector for the date input element (relative to `path`). Uses exact match (`=`) for simple names, prefix match (`^=`) for names with dots. |
| `label` | string? | The field's label text. Optional: only present when the HTML contains a label element. |
