# Output

## Simple Name (exact match)

```json
{
  "type": "field",
  "kind": "text-field",
  "path": "[data-testid=\"text-field\"]:has(input[name=\"groupTitle\"])",
  "meta": {
    "input": "input[name=\"groupTitle\"]",
    "inputType": "text",
    "label": "Group Name"
  }
}
```

## Localized/Array Name (prefix match)

```json
{
  "type": "field",
  "kind": "text-field",
  "path": "[data-testid=\"text-field\"]:has(input[name^=\"localisedName\"])",
  "meta": {
    "input": "input[name^=\"localisedName\"]",
    "inputType": "text",
    "label": "Event Name"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for the text input element (relative to `path`). Uses exact match (`=`) for simple names, prefix match (`^=`) for names with dots (localized or array-indexed). |
| `inputType` | string | HTML input type: `text`, `url`, `email`, `tel`, or `search` |
| `label` | string? | The field's label text. Optional: only present when the HTML contains a label element. |
