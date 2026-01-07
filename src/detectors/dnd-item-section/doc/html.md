# Example HTML

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
