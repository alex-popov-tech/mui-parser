# Output

```json
{
  "type": "field",
  "kind": "text-field",
  "path": "div[data-testid=\"text-field\"]:has(input[name^=\"localisedName\"])",
  "meta": {
    "input": "input[name^=\"localisedName\"]",
    "inputType": "text"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for the text input element (relative to `path`) |
| `inputType` | string | HTML input type: `text`, `url`, `email`, `tel`, or `search` |
