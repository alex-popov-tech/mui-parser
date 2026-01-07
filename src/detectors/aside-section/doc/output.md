# Aside Section - Output Schema

```json
{
  "type": "section",
  "kind": "aside-section",
  "path": "aside",
  "meta": {},
  "children": []
}
```

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"section"` | Indicates a structural container element |
| `kind` | `"aside-section"` | Specific section type identifier |
| `path` | `string` | Playwright locator path - use with `locateBy()` |
| `meta` | `object` | Empty for this detector - no additional metadata |
| `children` | `array` | Nested detected elements within the aside |
