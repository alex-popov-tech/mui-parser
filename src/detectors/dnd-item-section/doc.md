# DnD Item Section Detector

Detects drag-and-drop item components within a sortable list. These items typically represent configurable entries (like CTA buttons, links, etc.) that can be reordered.

## Example HTML

### Full-featured item (with all optional elements)

```html
<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item1">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">CTA Button Link</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <button type="button" data-testid="card-toggle">
              <svg data-testid="ExpandLessIcon"></svg>
            </button>
            <label data-testid="toggle-field">
              <span class="MuiSwitch-root">
                <input type="checkbox" name="alertBanner.buttons.0.enabled" checked>
              </span>
            </label>
            <button type="button">
              <svg data-testid="ClearIcon"></svg>
            </button>
          </div>
        </div>
        <div class="Card_body__g8vEX">
          <!-- Child form fields detected recursively -->
        </div>
      </div>
    </div>
  </div>
</div>
```

### Minimal item (title only)

```html
<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item2">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Simple Item</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
// when locating dnd-items we always use indexing accessors, to select particular item from the list
const container = stage.locateAllBy('{path}').first; // from page
const container = element.locateAllBy('{path}').nth(index); // from parent element

// HOW TO ASSERT VALUE
// title
await container.locateAllBy('{path}').first.locateBy('{meta.title}').should(have.text('...'));
// enabled
await container.locateAllBy('{path}').first.locateBy('{meta.enabled}').locateBy('input[type="checkbox"]').parent.should(have.cssClass('Mui-checked'));

// HOW TO UPDATE
// collapse
await container.locateAllBy('{path}').first.locateBy('{meta.collapse}').click();
// expand
await container.locateAllBy('{path}').first.locateBy('{meta.expand}').click();
// enable/disable - usually called 'toggle'
await container.locateAllBy('{path}').first.locateBy('{meta.enabled}').click();
```

## Output

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

## Why Some Fields Are Optional

DnD items can appear in different configurations depending on their purpose:

1. **Title** (required): Every item needs a title to identify it in the list. This is the only element that must always be present.

2. **Enabled switch** (optional): Some items can be toggled on/off without removing them from the list. Not all item types support this.

3. **Remove button** (optional): Some lists allow items to be removed, others have a fixed set of items.

4. **Expand/collapse buttons** (optional): Some items have collapsible content, others are always expanded or have no expandable body.

## Structure Requirements

The detector validates this structure:

1. Root must be `<div>` with `data-testid="dnd-draggable-item"`
2. Must contain a Card wrapper (`Card_wrapper__*` class)
3. Must contain a Card header (`Card_header__*` class)
4. Header must contain a title/heading (`Card_heading__*` class)

Optional elements detected but not required:
- Close/remove button with `ClearIcon`
- Toggle button with `ExpandMoreIcon` or `ExpandLessIcon`
- Enabled switch with `toggle-field` testid

## Expand/Collapse State

The item can be in two visual states:

- **Expanded**: Shows `ExpandLessIcon` (click to collapse), body is visible
- **Collapsed**: Shows `ExpandMoreIcon` (click to expand), body is hidden

The detector outputs whichever icon is currently visible:
- `expand` selector is present when `ExpandMoreIcon` is in the DOM
- `collapse` selector is present when `ExpandLessIcon` is in the DOM

## Child Detection

When the body container (`Card_body__*`) exists, it is returned as a `childContainer`, enabling recursive detection of form fields within the item.
