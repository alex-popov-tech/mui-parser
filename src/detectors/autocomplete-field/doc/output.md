# Output Schema

```json
{
  "type": "field",
  "kind": "autocomplete",
  "path": ".MuiFormControl-root:has(.MuiAutocomplete-root[name=\"additionalDeliveryTypes\"])",
  "meta": {
    "input": ".MuiAutocomplete-input",
    "clearIndicator": ".MuiAutocomplete-clearIndicator",
    "options": "[role='presentation'] [role='option']"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for input element (relative to `path`). Used for typing to filter options. |
| `clearIndicator` | string | Selector for clear button (relative to `path`). Only visible when a value is selected. |
| `options` | string | Selector for dropdown options (absolute, in portal). Each option has `value` attribute. |
