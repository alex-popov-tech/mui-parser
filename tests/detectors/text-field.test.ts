import { describe, expect, it } from "vitest";
import { textFieldDetector } from "../../src/detectors/text-field";
import type { TextFieldMeta } from "../../src/detectors/text-field";
import { createContext } from "../helpers";

// Valid text field with localized name
const VALID_TEXT_FIELD = `<div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43" data-testid="text-field">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required" data-shrink="true" for=":r4m:" id=":r4m:-label">
    Event Name
    <span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-3fe08"> *</span>
  </label>
  <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1rgex39">
    <input aria-invalid="false" aria-describedby=":r4m:-helper-text" id=":r4m:" name="localisedName.values.en" required="" type="text" dir="auto" class="MuiInputBase-input MuiOutlinedInput-input css-13ny0hi" value="IanV-Test">
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
      <legend class="css-14lo706"><span>Event Name *</span></legend>
    </fieldset>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled Mui-required css-1lzxs8f" id=":r4m:-helper-text"></p>
</div>`;

// Valid text field with simple name (no localization)
const VALID_TEXT_FIELD_SIMPLE_NAME = `<div class="MuiFormControl-root MuiTextField-root" data-testid="text-field">
  <label class="MuiInputLabel-root">Username</label>
  <div class="MuiInputBase-root MuiOutlinedInput-root">
    <input type="text" name="username" class="MuiInputBase-input MuiOutlinedInput-input" value="">
  </div>
</div>`;

// Invalid: wrong tag (span instead of div)
const WRONG_TAG = `<span class="MuiTextField-root" data-testid="text-field">
  <div class="MuiInputBase-root">
    <input type="text" name="test" class="MuiInputBase-input">
  </div>
</span>`;

// Invalid: missing data-testid
const MISSING_TESTID = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="text" name="test" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: wrong data-testid
const WRONG_TESTID = `<div class="MuiTextField-root" data-testid="select-field">
  <div class="MuiInputBase-root">
    <input type="text" name="test" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: missing MuiTextField-root class
const MISSING_CLASS = `<div data-testid="text-field">
  <div class="MuiInputBase-root">
    <input type="text" name="test" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: missing MuiInputBase-root
const MISSING_INPUT_BASE = `<div class="MuiTextField-root" data-testid="text-field">
  <input type="text" name="test" class="MuiInputBase-input">
</div>`;

// Invalid: missing input name
const MISSING_INPUT_NAME = `<div class="MuiTextField-root" data-testid="text-field">
  <div class="MuiInputBase-root">
    <input type="text" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: empty input name
const EMPTY_INPUT_NAME = `<div class="MuiTextField-root" data-testid="text-field">
  <div class="MuiInputBase-root">
    <input type="text" name="" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: wrong input type
const WRONG_INPUT_TYPE = `<div class="MuiTextField-root" data-testid="text-field">
  <div class="MuiInputBase-root">
    <input type="password" name="test" class="MuiInputBase-input">
  </div>
</div>`;

describe("text-field detector", () => {
  describe("valid detection", () => {
    it("detects valid text field with localized name", () => {
      const { el, $ } = createContext(VALID_TEXT_FIELD);
      const result = textFieldDetector.detect(el, $);

      const expectedMeta: TextFieldMeta = {
        input: 'input[name^="localisedName"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "text-field",
          path: '[data-testid="text-field"]:has(input[name^="localisedName"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects valid text field with simple name", () => {
      const { el, $ } = createContext(VALID_TEXT_FIELD_SIMPLE_NAME);
      const result = textFieldDetector.detect(el, $);

      const expectedMeta: TextFieldMeta = {
        input: 'input[name^="username"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "text-field",
          path: '[data-testid="text-field"]:has(input[name^="username"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (span instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(MISSING_TESTID);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong data-testid", () => {
      const { el, $ } = createContext(WRONG_TESTID);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiTextField-root class", () => {
      const { el, $ } = createContext(MISSING_CLASS);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiInputBase-root", () => {
      const { el, $ } = createContext(MISSING_INPUT_BASE);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input name", () => {
      const { el, $ } = createContext(MISSING_INPUT_NAME);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects empty input name", () => {
      const { el, $ } = createContext(EMPTY_INPUT_NAME);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong input type", () => {
      const { el, $ } = createContext(WRONG_INPUT_TYPE);
      expect(textFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
