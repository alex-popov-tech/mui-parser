import { describe, expect, it } from "vitest";
import { dateFieldDetector } from "../../src/detectors/date-field";
import type { DateFieldMeta } from "../../src/detectors/date-field";
import { createContext } from "../helpers";

// Valid date field from real MUI DateField component
const VALID_DATE_FIELD = `<div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary css-1b1iub2" data-shrink="false" for=":r18:" id=":r18:-label">Start Date</label>
  <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd css-1jnnsb9">
    <input aria-invalid="false" aria-describedby=":r18:-helper-text" id=":r18:" name="date.start" placeholder="dd/mm/yyyy" type="tel" data-testid="date-field" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-w1jawv" value="" style="text-transform: uppercase">
    <div class="MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-1nvf7g0">
      <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium css-slyssw" tabindex="0" type="button" aria-label="Choose date">
        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CalendarIcon">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
        </svg>
      </button>
    </div>
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
      <legend class="css-yjsfm1"><span>Start Date</span></legend>
    </fieldset>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f" id=":r18:-helper-text"></p>
</div>`;

// Valid date field with simple name
const VALID_DATE_FIELD_SIMPLE_NAME = `<div class="MuiTextField-root">
  <label class="MuiInputLabel-root">Date</label>
  <div class="MuiInputBase-root MuiOutlinedInput-root">
    <input type="tel" name="birthDate" data-testid="date-field" class="MuiInputBase-input MuiOutlinedInput-input" placeholder="dd/mm/yyyy" value="">
    <div class="MuiInputAdornment-root">
      <button aria-label="Choose date"><svg></svg></button>
    </div>
  </div>
</div>`;

// Invalid: wrong tag (span instead of div)
const WRONG_TAG = `<span class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="tel" name="date.start" data-testid="date-field" class="MuiInputBase-input">
  </div>
</span>`;

// Invalid: missing MuiTextField-root class
const MISSING_CLASS = `<div>
  <div class="MuiInputBase-root">
    <input type="tel" name="date.start" data-testid="date-field" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: missing MuiInputBase-root
const MISSING_INPUT_BASE = `<div class="MuiTextField-root">
  <input type="tel" name="date.start" data-testid="date-field" class="MuiInputBase-input">
</div>`;

// Invalid: missing data-testid on input
const MISSING_TESTID = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="tel" name="date.start" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: wrong data-testid
const WRONG_TESTID = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="tel" name="date.start" data-testid="text-field" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: wrong input type (text instead of tel)
const WRONG_INPUT_TYPE = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="text" name="date.start" data-testid="date-field" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: missing input name
const MISSING_INPUT_NAME = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="tel" data-testid="date-field" class="MuiInputBase-input">
  </div>
</div>`;

// Invalid: empty input name
const EMPTY_INPUT_NAME = `<div class="MuiTextField-root">
  <div class="MuiInputBase-root">
    <input type="tel" name="" data-testid="date-field" class="MuiInputBase-input">
  </div>
</div>`;

describe("date-field detector", () => {
  describe("valid detection", () => {
    it("detects valid date field with dotted name", () => {
      const { el, $ } = createContext(VALID_DATE_FIELD);
      const result = dateFieldDetector.detect(el, $);

      const expectedMeta: DateFieldMeta = {
        input: 'input[name^="date.start"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "date-field",
          path: '.MuiTextField-root:has(input[data-testid="date-field"][name^="date.start"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects valid date field with simple name", () => {
      const { el, $ } = createContext(VALID_DATE_FIELD_SIMPLE_NAME);
      const result = dateFieldDetector.detect(el, $);

      const expectedMeta: DateFieldMeta = {
        input: 'input[name^="birthDate"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "date-field",
          path: '.MuiTextField-root:has(input[data-testid="date-field"][name^="birthDate"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (span instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiTextField-root class", () => {
      const { el, $ } = createContext(MISSING_CLASS);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiInputBase-root", () => {
      const { el, $ } = createContext(MISSING_INPUT_BASE);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid on input", () => {
      const { el, $ } = createContext(MISSING_TESTID);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong data-testid on input", () => {
      const { el, $ } = createContext(WRONG_TESTID);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong input type (text instead of tel)", () => {
      const { el, $ } = createContext(WRONG_INPUT_TYPE);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input name", () => {
      const { el, $ } = createContext(MISSING_INPUT_NAME);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects empty input name", () => {
      const { el, $ } = createContext(EMPTY_INPUT_NAME);
      expect(dateFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
