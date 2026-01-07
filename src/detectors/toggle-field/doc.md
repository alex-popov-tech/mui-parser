# Toggle/Switch Detector

Detects MUI Switch components wrapped in FormControlLabel.

## Example HTML

```html
<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root">
    <span class="MuiSwitch-switchBase">
      <input class="MuiSwitch-input" name="featured" type="checkbox">
    </span>
  </span>
  <span class="MuiFormControlLabel-label">Featured</span>
</label>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
// toggle field
await container.locateBy('{path}').click();
```

## Output

```json
{
  "type": "field",
  "kind": "toggle",
  "path": "label[data-testid=\"toggle-field\"]:has(input[name=\"featured\"])",
  "meta": {
    "input": "input[name=\"featured\"]"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                    |
|---------|--------|------------------------------------------------|
| `input` | string | Selector for checkbox input (relative to `path`) |

## Value Handling

- **Read**: Check if `.MuiSwitch-switchBase` (parent of input) has `Mui-checked` class
  - Class present → ON
  - Class absent → OFF
- **Write**: Click the root element (`path`) to toggle state

### ON state example

```html
<span class="MuiSwitch-switchBase Mui-checked ...">
  <input name="hideFromSearchEngines" type="checkbox">
</span>
```

### OFF state example

```html
<span class="MuiSwitch-switchBase ...">
  <input name="hideFromInformaSearch" type="checkbox">
</span>
```
