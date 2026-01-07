# Date Field Detector

Detects MUI DateField/DatePicker components.

## Example HTML

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
  <label
    class="MuiFormLabel-root MuiInputLabel-root ... css-1b1iub2"
    data-shrink="false"
    for=":r18:"
    id=":r18:-label"
  >Start Date</label>
  <div class="MuiInputBase-root MuiOutlinedInput-root ... css-1jnnsb9">
    <input
      aria-invalid="false"
      aria-describedby=":r18:-helper-text"
      id=":r18:"
      name="date.start"
      placeholder="dd/mm/yyyy"
      type="tel"
      data-testid="date-field"
      class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-w1jawv"
      value=""
      style="text-transform: uppercase"
    />
    <div class="MuiInputAdornment-root MuiInputAdornment-positionEnd ... css-1nvf7g0">
      <button
        class="MuiButtonBase-root MuiIconButton-root ... css-slyssw"
        tabindex="0"
        type="button"
        aria-label="Choose date"
      >
        <svg class="MuiSvgIcon-root ..." data-testid="CalendarIcon">...</svg>
      </button>
    </div>
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
      <legend class="css-yjsfm1"><span>Start Date</span></legend>
    </fieldset>
  </div>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await container.locateBy('{path}').locateBy('{meta.input}').should(have.value('...'));

// HOW TO SET VALUE
await container.locateBy('{path}').locateBy('{meta.input}').setValue('some valid formatted date');
```

## Example Output

```json
{
  "type": "field",
  "kind": "date-field",
  "path": ".MuiTextField-root:has(input[data-testid=\"date-field\"][name^=\"date.start\"])",
  "meta": {
    "input": "input[name^=\"date.start\"]"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                        |
| ------- | ------ | -------------------------------------------------- |
| `input` | string | Selector for the date input element (relative to `path`) |

## Value Handling

- **Read**: Get the value from the input's `value` attribute. Format is typically `dd/mm/yyyy`.
- **Write**: Set the input's value using Playwright's `fill()` method.

## Identification

Date fields are identified by:
1. Root element has `MuiTextField-root` class
2. Contains input with `data-testid="date-field"`
3. Input has `type="tel"` (used for formatted date entry)
4. Has a calendar button adornment with `aria-label="Choose date"`
