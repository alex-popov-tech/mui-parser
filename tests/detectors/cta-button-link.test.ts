import { describe, expect, it } from "vitest";
import { ctaButtonLinkDetector } from "../../src/detectors/cta-button-link";
import type { CtaButtonLinkMeta } from "../../src/detectors/cta-button-link";
import { createContext } from "../helpers";

// Valid CTA Button Link - full structure
const VALID_CTA_BUTTON_LINK = `
<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 Card_wrapper__Elhl4 css-1eon19a">
  <div class="Card_header__Udn-I">
    <div class="Card_headerLeft__LhSq5">
      <span class="Card_heading__8mN0R">CTA Button Link</span>
    </div>
    <div class="Card_headerRight__xbLIV">
      <button class="MuiButtonBase-root MuiIconButton-root" data-testid="card-toggle">
        <svg></svg>
      </button>
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <label class="MuiFormControlLabel-root" data-testid="toggle-field">
            <span class="MuiSwitch-root MuiSwitch-sizeSmall">
              <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary Mui-checked">
                <input class="MuiSwitch-input" name="alertBanner.buttons.0.enabled" type="checkbox" checked="">
                <span class="MuiSwitch-thumb"></span>
              </span>
              <span class="MuiSwitch-track"></span>
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="Card_body__g8vEX">
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root MuiFormControl-fullWidth">
          <label class="MuiFormLabel-root MuiInputLabel-root">Call To Action Link</label>
          <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root">
            <div tabindex="0" role="combobox" id="mui-component-select-alertBanner.buttons.0.selectType" class="MuiSelect-select">Custom Page</div>
            <input name="alertBanner.buttons.0.selectType" class="MuiSelect-nativeInput" value="CUSTOM">
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root MuiTextField-root" data-testid="text-field">
          <label class="MuiFormLabel-root MuiInputLabel-root">URL / Email Address / Phone Number</label>
          <div class="MuiInputBase-root MuiOutlinedInput-root">
            <input name="alertBanner.buttons.0.customUrl" type="url" class="MuiInputBase-input" value="">
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root MuiTextField-root" data-testid="text-field">
          <label class="MuiFormLabel-root MuiInputLabel-root">CTA Button Text</label>
          <div class="MuiInputBase-root MuiOutlinedInput-root">
            <input name="alertBanner.buttons.0.customText" type="text" class="MuiInputBase-input" value="">
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root">
          <label class="MuiFormLabel-root">Style</label>
          <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.colorStyle">
            <button class="MuiButtonBase-root MuiToggleButton-root Mui-selected" value="STYLE_1" aria-pressed="true">1</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="STYLE_2" aria-pressed="false">2</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="STYLE_3" aria-pressed="false">3</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="STYLE_4" aria-pressed="false">4</button>
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root">
          <label class="MuiFormLabel-root">Size</label>
          <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.size">
            <button class="MuiButtonBase-root MuiToggleButton-root Mui-selected" value="SMALL" aria-pressed="true">S</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="MEDIUM" aria-pressed="false">M</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="LARGE" aria-pressed="false">L</button>
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <div class="MuiFormControl-root">
          <label class="MuiFormLabel-root">Variant</label>
          <div role="group" class="MuiToggleButtonGroup-root" name="alertBanner.buttons.0.variant">
            <button class="MuiButtonBase-root MuiToggleButton-root Mui-selected" value="TEXT" aria-pressed="true">Text</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="CONTAINED" aria-pressed="false">Contained</button>
            <button class="MuiButtonBase-root MuiToggleButton-root" value="OUTLINED" aria-pressed="false">Outlined</button>
          </div>
        </div>
      </div>
    </div>
    <div class="FormFieldWrapper_wrapper__1reXs">
      <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
        <label class="MuiFormControlLabel-root" data-testid="toggle-field">
          <span class="MuiSwitch-root">
            <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary">
              <input class="MuiSwitch-input" name="alertBanner.buttons.0.openInNewTabEnabled" type="checkbox">
              <span class="MuiSwitch-thumb"></span>
            </span>
            <span class="MuiSwitch-track"></span>
          </span>
          <span class="MuiFormControlLabel-label">Open in a new tab</span>
        </label>
      </div>
    </div>
  </div>
</div>`;

// Invalid: wrong tag (span instead of div)
const WRONG_TAG = `
<span class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
  </div>
</span>`;

// Invalid: missing MuiPaper-root class
const MISSING_PAPER_CLASS = `
<div class="Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
  </div>
</div>`;

// Invalid: missing Card_wrapper__ class
const MISSING_CARD_WRAPPER_CLASS = `
<div class="MuiPaper-root MuiPaper-elevation">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
  </div>
</div>`;

// Invalid: wrong heading text
const WRONG_HEADING = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">Some Other Card</span>
  </div>
</div>`;

// Invalid: missing heading
const MISSING_HEADING = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <div class="Card_headerLeft__LhSq5"></div>
  </div>
</div>`;

// Invalid: missing style toggle button group
const MISSING_STYLE_GROUP = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
    <input name="test.enabled" type="checkbox">
  </div>
  <div class="Card_body__g8vEX">
    <div data-testid="select-field">
      <input name="test.selectType">
    </div>
    <div role="group" name="test.size"></div>
    <div role="group" name="test.variant"></div>
    <input name="test.openInNewTabEnabled" type="checkbox">
  </div>
</div>`;

// Invalid: missing size toggle button group
const MISSING_SIZE_GROUP = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
    <input name="test.enabled" type="checkbox">
  </div>
  <div class="Card_body__g8vEX">
    <div data-testid="select-field">
      <input name="test.selectType">
    </div>
    <div role="group" name="test.colorStyle"></div>
    <div role="group" name="test.variant"></div>
    <input name="test.openInNewTabEnabled" type="checkbox">
  </div>
</div>`;

// Invalid: missing variant toggle button group
const MISSING_VARIANT_GROUP = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
    <input name="test.enabled" type="checkbox">
  </div>
  <div class="Card_body__g8vEX">
    <div data-testid="select-field">
      <input name="test.selectType">
    </div>
    <div role="group" name="test.colorStyle"></div>
    <div role="group" name="test.size"></div>
    <input name="test.openInNewTabEnabled" type="checkbox">
  </div>
</div>`;

// Invalid: missing select field
const MISSING_SELECT = `
<div class="MuiPaper-root Card_wrapper__Elhl4">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">CTA Button Link</span>
    <input name="test.enabled" type="checkbox">
  </div>
  <div class="Card_body__g8vEX">
    <div role="group" name="test.colorStyle"></div>
    <div role="group" name="test.size"></div>
    <div role="group" name="test.variant"></div>
    <input name="test.openInNewTabEnabled" type="checkbox">
  </div>
</div>`;

describe("cta-button-link detector", () => {
  describe("valid detection", () => {
    it("detects valid CTA button link and extracts all data", () => {
      const { el, $ } = createContext(VALID_CTA_BUTTON_LINK);
      const result = ctaButtonLinkDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.type).toBe("field");
      expect(result?.node.kind).toBe("cta-button-link");
      expect(result?.node.path).toBe(
        'div.MuiPaper-root[class*="Card_wrapper__"]:has(span:text-is("CTA Button Link"))',
      );
      expect(result?.childContainers).toEqual([]);

      const meta = result?.node.meta as CtaButtonLinkMeta;
      expect(meta.enabled).toBe('input[name$="enabled"]');
      expect(meta.fields.callToAction.input).toBe('input[name$="selectType"]');
      expect(meta.fields.callToAction.options).toContain("[role=\"option\"]");
      expect(meta.fields.customUrl).toBe('input[name$="customUrl"]');
      expect(meta.fields.customText).toBe('input[name$="customText"]');
      expect(meta.fields.style.buttons).toBe(
        '[role="group"][name$="colorStyle"] button',
      );
      expect(meta.fields.style.selected).toBe(
        '[role="group"][name$="colorStyle"] button[aria-pressed="true"]',
      );
      expect(meta.fields.size.buttons).toBe(
        '[role="group"][name$="size"] button',
      );
      expect(meta.fields.size.selected).toBe(
        '[role="group"][name$="size"] button[aria-pressed="true"]',
      );
      expect(meta.fields.variant.buttons).toBe(
        '[role="group"][name$="variant"] button',
      );
      expect(meta.fields.variant.selected).toBe(
        '[role="group"][name$="variant"] button[aria-pressed="true"]',
      );
      expect(meta.fields.openInNewTabEnabled).toBe(
        'input[name$="openInNewTabEnabled"]',
      );
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (span instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiPaper-root class", () => {
      const { el, $ } = createContext(MISSING_PAPER_CLASS);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing Card_wrapper__ class", () => {
      const { el, $ } = createContext(MISSING_CARD_WRAPPER_CLASS);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong heading text", () => {
      const { el, $ } = createContext(WRONG_HEADING);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing heading", () => {
      const { el, $ } = createContext(MISSING_HEADING);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing style toggle button group", () => {
      const { el, $ } = createContext(MISSING_STYLE_GROUP);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing size toggle button group", () => {
      const { el, $ } = createContext(MISSING_SIZE_GROUP);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing variant toggle button group", () => {
      const { el, $ } = createContext(MISSING_VARIANT_GROUP);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing select field", () => {
      const { el, $ } = createContext(MISSING_SELECT);
      expect(ctaButtonLinkDetector.detect(el, $)).toBeNull();
    });
  });
});
