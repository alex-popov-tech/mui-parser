# CTA Button Link Detector

Detects CTA (Call To Action) Button Link composite components. This is a wrapper component that contains multiple child controls (select, text fields, toggle button groups, toggles) parsed as a single unit rather than separate fields.

## Example HTML

```html
<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 Card_wrapper__Elhl4 css-1eon19a">
  <div class="Card_header__Udn-I">
    <div class="Card_headerLeft__LhSq5">
      <span class="Card_heading__8mN0R">CTA Button Link</span>
    </div>
    <div class="Card_headerRight__xbLIV">
      <!-- Collapse/expand button -->
      <button class="MuiButtonBase-root MuiIconButton-root" data-testid="card-toggle">...</button>
      <!-- Enabled toggle -->
      <div class="FormFieldWrapper_wrapper__1reXs">
        <label class="MuiFormControlLabel-root" data-testid="toggle-field">
          <span class="MuiSwitch-root MuiSwitch-sizeSmall">
            <span class="MuiSwitch-switchBase Mui-checked">
              <input name="alertBanner.buttons.0.enabled" type="checkbox" checked="">
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
  <div class="Card_body__g8vEX">
    <!-- Call To Action Link select -->
    <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root">
      <div role="combobox" id="mui-component-select-alertBanner.buttons.0.selectType">Custom Page</div>
      <input name="alertBanner.buttons.0.selectType" value="CUSTOM">
    </div>

    <!-- Conditional text fields (shown when CUSTOM selected) -->
    <div data-testid="text-field" class="MuiTextField-root">
      <input name="alertBanner.buttons.0.customUrl" type="url">
    </div>
    <div data-testid="text-field" class="MuiTextField-root">
      <input name="alertBanner.buttons.0.customText" type="text">
    </div>

    <!-- Style toggle button group -->
    <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.colorStyle">
      <button value="STYLE_1" aria-pressed="true">1</button>
      <button value="STYLE_2" aria-pressed="false">2</button>
      <button value="STYLE_3" aria-pressed="false">3</button>
      <button value="STYLE_4" aria-pressed="false">4</button>
    </div>

    <!-- Size toggle button group -->
    <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.size">
      <button value="SMALL" aria-pressed="true">S</button>
      <button value="MEDIUM" aria-pressed="false">M</button>
      <button value="LARGE" aria-pressed="false">L</button>
    </div>

    <!-- Variant toggle button group -->
    <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.variant">
      <button value="TEXT" aria-pressed="true">Text</button>
      <button value="CONTAINED" aria-pressed="false">Contained</button>
      <button value="OUTLINED" aria-pressed="false">Outlined</button>
    </div>

    <!-- Open in new tab toggle -->
    <label class="MuiFormControlLabel-root" data-testid="toggle-field">
      <span class="MuiSwitch-root">
        <span class="MuiSwitch-switchBase">
          <input name="alertBanner.buttons.0.openInNewTabEnabled" type="checkbox">
        </span>
      </span>
      <span class="MuiFormControlLabel-label">Open in a new tab</span>
    </label>
  </div>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
// some field depend on what we choose in 'callToAction' field
// usually we select 'Custom Page' there
await container.locateBy('{meta.fields.callToAction.input}').click();
await stage.locateBy('{meta.fields.callToAction.options}:has-text("Custom Page")').click(); // search from the page
// then there are two mandatory fields appear to fill
await container.locateBy('{meta.fields.customUrl}').setValue('https://google.com');
await container.locateBy('{meta.fields.customText}').setValue('cta button text');
// rest fields to be ignored
```

## Output

```json
{
  "type": "field",
  "kind": "cta-button-link",
  "path": "div.MuiPaper-root[class*=\"Card_wrapper__\"]:has(span:text-is(\"CTA Button Link\"))",
  "meta": {
    "enabled": "input[name$=\"enabled\"]",
    "fields": {
      "callToAction": {
        "input": "input[name$=\"selectType\"]",
        "options": "[aria-labelledby=\"mui-component-select-alertBanner.buttons.0.selectType\"] [role=\"option\"]"
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
| `fields.callToAction.input` | string | Selector for Call To Action Link select input (relative to `path`) |
| `fields.callToAction.options` | string | Selector for dropdown options (absolute, portaled to document root) |
| `fields.customUrl` | string | Selector for URL/email/phone text input (relative to `path`) |
| `fields.customText` | string | Selector for CTA button text input (relative to `path`) |
| `fields.style.buttons` | string | Selector for all style toggle buttons (relative to `path`) |
| `fields.style.selected` | string | Selector for selected style button (relative to `path`) |
| `fields.size.buttons` | string | Selector for all size toggle buttons (relative to `path`) |
| `fields.size.selected` | string | Selector for selected size button (relative to `path`) |
| `fields.variant.buttons` | string | Selector for all variant toggle buttons (relative to `path`) |
| `fields.variant.selected` | string | Selector for selected variant button (relative to `path`) |
| `fields.openInNewTabEnabled` | string | Selector for open in new tab toggle (relative to `path`) |

## Toggle Button Groups

Each toggle button group has two selectors:
- `buttons`: Selector for all buttons in the group
- `selected`: Selector for the currently selected button (has `aria-pressed="true"`)

### Reading Current Value

Get the `value` attribute from the selected button:
```javascript
const selected = ctaContainer.locator('[role="group"][name$="colorStyle"] button[aria-pressed="true"]');
const value = await selected.getAttribute('value'); // e.g., "STYLE_1"
```

### Changing Value

Click the desired button:
```javascript
await ctaContainer.locator('[role="group"][name$="colorStyle"] button[value="STYLE_2"]').click();
```

## Call To Action Link Select

The dropdown options are **portaled** to the document root (outside the CTA container). Use the `aria-labelledby` attribute to find the menu when opened.

### Reading Current Value

```javascript
const input = ctaContainer.locator('input[name$="selectType"]');
const value = await input.getAttribute('value'); // e.g., "CUSTOM"
```

### Selecting an Option

1. Click the combobox to open the dropdown
2. Find the portaled menu using `aria-labelledby`
3. Click the desired option

## Conditional Fields

The `customUrl` and `customText` fields are only shown when specific options are selected in the callToAction dropdown. The parser always includes these selectors in the meta, but they may not find elements if those fields are not currently visible.

## Collision Prevention

This detector matches the Card wrapper element (`div.MuiPaper-root[class*="Card_wrapper__"]`) and returns empty `childContainers`, preventing the parser from recursing into child elements. This ensures inner components (text-field, select-field, toggle) are not detected separately.
