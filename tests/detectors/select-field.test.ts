import { describe, expect, it } from "vitest";
import { selectFieldDetector } from "../../src/detectors/select-field";
import type { SelectFieldMeta } from "../../src/detectors/select-field";
import { createContext } from "../helpers";

const VALID_SELECT_FIELD = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required" data-shrink="true">
    Event Type<span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk"> *</span>
  </label>
  <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-leefbf">
    <div tabindex="0" role="combobox" aria-controls=":r4t:" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="mui-component-select-type" id="mui-component-select-type" class="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input">Hold</div>
    <input aria-invalid="false" name="type" aria-hidden="true" tabindex="-1" class="MuiSelect-nativeInput css-1k3x8v3" required="" value="HOLD">
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline">
      <legend><span>Event Type *</span></legend>
    </fieldset>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled Mui-required"></p>
</div>
`;

const INVALID_WRONG_TAG = `
<span class="MuiFormControl-root" data-testid="select-field">
  <input name="type" class="MuiSelect-nativeInput" value="HOLD">
</span>
`;

const INVALID_MISSING_TESTID = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiInputBase-root MuiOutlinedInput-root">
    <div class="MuiSelect-select">Hold</div>
    <input name="type" class="MuiSelect-nativeInput" value="HOLD">
  </div>
</div>
`;

const INVALID_MISSING_INPUT_NAME = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root">
    <div class="MuiSelect-select">Hold</div>
    <input class="MuiSelect-nativeInput" value="HOLD">
  </div>
</div>
`;

const INVALID_MISSING_SELECT = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root">
    <input name="type" class="MuiSelect-nativeInput" value="HOLD">
  </div>
</div>
`;

const INVALID_MISSING_FORMCONTROL_CLASS = `
<div class="SomeOtherClass">
  <div data-testid="select-field" class="MuiInputBase-root MuiOutlinedInput-root">
    <div class="MuiSelect-select">Hold</div>
    <input name="type" class="MuiSelect-nativeInput" value="HOLD">
  </div>
</div>
`;

describe("select-field detector", () => {
  describe("valid detection", () => {
    it("detects valid select-field and extracts data", () => {
      const { el, $ } = createContext(VALID_SELECT_FIELD);
      const result = selectFieldDetector.detect(el, $);

      const expectedMeta: SelectFieldMeta = {
        input: 'input[name="type"]',
        options: '[role="presentation"]#menu-type [role="option"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "select-field",
          path: '[data-testid="select-field"]:has(input[name="type"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong root tag", () => {
      const { el, $ } = createContext(INVALID_WRONG_TAG);
      expect(selectFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(INVALID_MISSING_TESTID);
      expect(selectFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input name", () => {
      const { el, $ } = createContext(INVALID_MISSING_INPUT_NAME);
      expect(selectFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiSelect-select element", () => {
      const { el, $ } = createContext(INVALID_MISSING_SELECT);
      expect(selectFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiFormControl-root class", () => {
      const { el, $ } = createContext(INVALID_MISSING_FORMCONTROL_CLASS);
      expect(selectFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
