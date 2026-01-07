# Output

```json
{
  "type": "section",
  "kind": "form-section",
  "path": "section[class*=\"FormSection_wrapper__\"]:has(h2:text-is(\"Event Setup\"))",
  "meta": {
    "title": "h2[class*=\"FormSection_title__\"]",
    "body": "div[class*=\"FormSection_body__\"]",
    "fields": "[data-testid=\"form-field-wrapper\"]"
  },
  "children": [
    // Child fields detected recursively
  ]
}
```

## Meta Fields

| Field    | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| `title`  | string | Selector for section title heading (relative to `path`)        |
| `body`   | string | Selector for section body container (relative to `path`)       |
| `fields` | string | Selector for form field wrappers within section (relative to `path`) |
