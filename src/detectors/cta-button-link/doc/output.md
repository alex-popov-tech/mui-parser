# CTA Button Link - Output Schema

```json
{
  "type": "field",
  "kind": "cta-button-link",
  "path": "div.MuiPaper-root[class*=\"Card_wrapper__\"]:has(span:text-is(\"CTA Button Link\"))",
  "meta": {
    "enabled": "input[name$=\"enabled\"]",
    "fields": {
      "callToAction": {
        "input": "[data-testid=\"select-field\"]:has(input[name$=\"selectType\"])",
        "options": "[role=\"presentation\"][id$=\"selectType\"] li"
      },
      "customUrl": "input[name$=\"customUrl\"]",
      "customText": "input[name$=\"customText\"]",
      "style": {
        "buttons": "[role=\"group\"][name$=\"colorStyle\"] button",
        "selected": "[role=\"group\"][name$=\"colorStyle\"] button[aria-pressed=\"true\"]"
      },
      "size": {
        "buttons": "[role=\"group\"][name$=\"size\"] button",
        "selected": "[role=\"group\"][name$=\"size\"] button[aria-pressed=\"true\"]"
      },
      "variant": {
        "buttons": "[role=\"group\"][name$=\"variant\"] button",
        "selected": "[role=\"group\"][name$=\"variant\"] button[aria-pressed=\"true\"]"
      },
      "openInNewTabEnabled": "input[name$=\"openInNewTabEnabled\"]"
    }
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | string | Selector for enabled toggle in card header (relative to `path`) |
| `fields.callToAction.input` | string | Selector for Call To Action Link select trigger (relative to `path`) |
| `fields.callToAction.options` | string | Selector for dropdown option items (absolute, portaled to document root) |
| `fields.customUrl` | string | Selector for URL/email/phone text input (relative to `path`) |
| `fields.customText` | string | Selector for CTA button text input (relative to `path`) |
| `fields.style.buttons` | string | Selector for all style toggle buttons (relative to `path`) |
| `fields.style.selected` | string | Selector for selected style button (relative to `path`) |
| `fields.size.buttons` | string | Selector for all size toggle buttons (relative to `path`) |
| `fields.size.selected` | string | Selector for selected size button (relative to `path`) |
| `fields.variant.buttons` | string | Selector for all variant toggle buttons (relative to `path`) |
| `fields.variant.selected` | string | Selector for selected variant button (relative to `path`) |
| `fields.openInNewTabEnabled` | string | Selector for open in new tab toggle (relative to `path`) |
