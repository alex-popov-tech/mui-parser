# Example HTML

## Field (closed state)

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-9dqsd3" data-shrink="true">
    Event Type<span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-3fe08"> *</span>
  </label>
  <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-leefbf">
    <div tabindex="0" role="combobox" aria-controls=":r4t:" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="mui-component-select-type" id="mui-component-select-type" class="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-1ivpgm0">Hold</div>
    <input aria-invalid="false" name="type" aria-hidden="true" tabindex="-1" class="MuiSelect-nativeInput css-1k3x8v3" required="" value="HOLD">
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-m9m7cd" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
      <legend class="css-14lo706"><span>Event Type *</span></legend>
    </fieldset>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled Mui-required css-1lzxs8f"></p>
</div>
```

## Dropdown Menu (when opened)

The options appear in a separate MuiMenu at the document root. **Important:** The menu container `id` follows the pattern `menu-{fieldName}` where `fieldName` is the `name` attribute of the hidden input.

For `input[name="type"]`, the menu container is `#menu-type`:

```html
<div role="presentation" id="menu-type" class="MuiPopover-root MuiMenu-root MuiModal-root css-1sucic7">
  <div aria-hidden="true" class="MuiBackdrop-root MuiBackdrop-invisible MuiModal-backdrop css-esi9ax"></div>
  <div tabindex="0" data-testid="sentinelStart"></div>
  <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper MuiMenu-paper MuiMenu-paper css-pwxzbm" tabindex="-1">
    <ul class="MuiList-root MuiList-padding MuiMenu-list css-r8u8y9" role="listbox" tabindex="-1" id=":r4t:">
      <li class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-x6659s" tabindex="-1" role="option" aria-selected="false" data-value="TURBOCHARGED">Turbo-charged</li>
      <li class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-x6659s" tabindex="-1" role="option" aria-selected="false" data-value="LARGE">Large</li>
      <li class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters Mui-selected MuiMenuItem-root MuiMenuItem-gutters Mui-selected css-x6659s" tabindex="0" role="option" aria-selected="true" data-value="HOLD">Hold</li>
    </ul>
  </div>
  <div tabindex="0" data-testid="sentinelEnd"></div>
</div>
```
