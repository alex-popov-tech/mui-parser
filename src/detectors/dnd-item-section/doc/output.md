# Output

### Full-featured item

```json
{
  "type": "section",
  "kind": "dnd-item-section",
  "path": "[data-testid=\"dnd-draggable-item\"]",
  "meta": {
    "title": "[class*=\"Card_heading__\"]",
    "body": "[class*=\"Card_body__\"]",
    "enabled": "[class*=\"Card_header__\"] [data-testid=\"toggle-field\"]",
    "remove": "button:has([data-testid=\"ClearIcon\"])",
    "collapse": "button:has([data-testid=\"ExpandLessIcon\"])",
    "expand": "button:has([data-testid=\"ExpandMoreIcon\"])"
  },
  "children": []
}
```

### Minimal item

```json
{
  "type": "section",
  "kind": "dnd-item-section",
  "path": "[data-testid=\"dnd-draggable-item\"]",
  "meta": {
    "title": "[class*=\"Card_heading__\"]",
    "body": "[class*=\"Card_body__\"]"
  },
  "children": []
}
```

## Meta Fields

| Field      | Type   | Required | Description                                                    |
| ---------- | ------ | -------- | -------------------------------------------------------------- |
| `title`    | string | Yes      | Selector for item title/heading in header                      |
| `body`     | string | Yes      | Selector for item body/content container                       |
| `enabled`  | string | No       | Selector for enabled/disabled toggle switch in header          |
| `remove`   | string | No       | Selector for remove/delete button                              |
| `expand`   | string | No       | Selector for expand button (shown when item is collapsed)      |
| `collapse` | string | No       | Selector for collapse button (shown when item is expanded)     |
| `expand` | string | No       | Selector for expand button (shown when item is collapsed)       |
