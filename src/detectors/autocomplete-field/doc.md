# Autocomplete Detector

Detects MUI Autocomplete components.

## Example HTML

### Main Container (closed state)

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-18col2x" name="additionalDeliveryTypes" data-testid="simple-autocomplete-field">
    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
      <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1b1iub2" data-shrink="false" for=":r4v:" id=":r4v:-label">Additional Attendance(s)</label>
      <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiAutocomplete-inputRoot css-1jnnsb9">
        <input aria-invalid="false" autocomplete="off" id=":r4v:" type="text" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiAutocomplete-input MuiAutocomplete-inputFocused css-w1jawv" aria-autocomplete="list" aria-expanded="false" autocapitalize="none" spellcheck="false" role="combobox" value="">
        <div class="MuiAutocomplete-endAdornment css-mxlkbn">
          <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-popupIndicator css-uge3vf" tabindex="-1" type="button" aria-label="Open" title="Open">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg>
            <span class="MuiTouchRipple-root css-w0pj6f"></span>
          </button>
        </div>
        <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
          <legend class="css-yjsfm1"><span>Additional Attendance(s)</span></legend>
        </fieldset>
      </div>
    </div>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f"></p>
</div>
```

### Portal (dropdown options, open state)

```html
<div role="presentation" class="MuiPopper-root MuiAutocomplete-popper css-1mtsuo7" style="position: absolute; inset: 0px auto auto 0px; width: 490px; margin: 0px; transform: translate3d(300px, 533.5px, 0px);" data-popper-placement="bottom">
  <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper css-t4hinj">
    <ul class="MuiAutocomplete-listbox css-1un3o65" role="listbox" id=":r4v:-listbox" aria-labelledby=":r4v:-label">
      <li>
        <div class="MuiListSubheader-root MuiListSubheader-gutters MuiListSubheader-sticky MuiAutocomplete-groupLabel css-15tzhly"></div>
        <ul class="MuiAutocomplete-groupUl css-15s1ek9">
          <li class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiAutocomplete-option css-x6659s Mui-focused" tabindex="-1" role="option" id=":r4v:-option-0" data-option-index="0" aria-disabled="false" aria-selected="false" value="VIRTUAL">Virtual<span class="MuiTouchRipple-root css-w0pj6f"></span></li>
          <li class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters MuiAutocomplete-option css-x6659s" tabindex="-1" role="option" id=":r4v:-option-1" data-option-index="1" aria-disabled="false" aria-selected="false" value="ON_DEMAND">On Demand<span class="MuiTouchRipple-root css-w0pj6f"></span></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const field = stage.locateBy('{path}'); // from page
const field = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await field.locateBy('{path}').locateBy('{meta.input}').should(have.value('...'));

// HOW TO SET VALUE
// type value first, so there will be less options, ideally only one, if its unique
await field.locateBy('{path}').locateBy('{meta.input}').setValue('some value');
// find floating option from page level and click on it
await stage.locateBy('{meta.options}:has-text("some value")').click();
```

## Example Output

```json
{
  "type": "field",
  "kind": "autocomplete",
  "path": ".MuiFormControl-root:has(.MuiAutocomplete-root[name=\"additionalDeliveryTypes\"])",
  "meta": {
    "input": ".MuiAutocomplete-input",
    "clearIndicator": ".MuiAutocomplete-clearIndicator",
    "options": "[role='presentation'] [role='option']"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for input element (relative to `path`). Used for typing to filter options. |
| `clearIndicator` | string | Selector for clear button (relative to `path`). Only visible when a value is selected. |
| `options` | string | Selector for dropdown options (absolute, in portal). Each option has `value` attribute. |

## Value Handling

- **Read**: Get current selection from input `value` attribute, or check for chips (multi-select)
- **Write**: Click on `path` to open dropdown, then click desired option from `options` selector
- **Clear**: Click the `clearIndicator` button (when visible)

### Option States

Options in the listbox have these attributes:
- `value` - The actual value to submit
- `aria-selected="true"` - Currently selected option
- `Mui-focused` class - Currently focused/highlighted option
- Text content - Display label

### Dropdown Connection

The dropdown portal is linked to the autocomplete via the input's `id`:
- Input has `id=":r4v:"`
- Listbox has `id=":r4v:-listbox"`
- Options selector escapes special characters: `#\:r4v\:-listbox`
