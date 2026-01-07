# CTA Button Link - HTML Example

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
