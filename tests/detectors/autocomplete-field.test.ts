import { describe, expect, it } from "vitest";
import { autocompleteFieldDetector } from "../../src/detectors/autocomplete-field";
import type { AutocompleteFieldMeta } from "../../src/detectors/autocomplete-field";
import { createContext } from "../helpers";

const VALID_AUTOCOMPLETE = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-18col2x" name="additionalDeliveryTypes" data-testid="simple-autocomplete-field">
    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
      <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" data-shrink="false" for=":r4v:" id=":r4v:-label">Additional Attendance(s)</label>
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
`;

const INVALID_WRONG_TAG = `
<span class="MuiFormControl-root">
  <div class="MuiAutocomplete-root" name="field">
    <input class="MuiAutocomplete-input" role="combobox" id="test">
  </div>
</span>
`;

const INVALID_MISSING_AUTOCOMPLETE_ROOT = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiTextField-root">
    <input class="MuiAutocomplete-input" role="combobox" id="test">
  </div>
</div>
`;

const INVALID_MISSING_NAME = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon">
    <div class="MuiInputBase-root">
      <input class="MuiAutocomplete-input" role="combobox" id="test">
    </div>
  </div>
</div>
`;

const INVALID_MISSING_INPUT = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiAutocomplete-root" name="field">
    <div class="MuiInputBase-root">
      <div class="MuiAutocomplete-endAdornment"></div>
    </div>
  </div>
</div>
`;

const INVALID_WRONG_ROLE = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiAutocomplete-root" name="field">
    <div class="MuiInputBase-root">
      <input class="MuiAutocomplete-input" role="textbox" id="test">
    </div>
  </div>
</div>
`;

const INVALID_MISSING_INPUT_ID = `
<div class="MuiFormControl-root MuiFormControl-fullWidth">
  <div class="MuiAutocomplete-root" name="field">
    <div class="MuiInputBase-root">
      <input class="MuiAutocomplete-input" role="combobox">
    </div>
  </div>
</div>
`;

const INVALID_MISSING_FORMCONTROL_CLASS = `
<div class="SomeOtherClass">
  <div class="MuiAutocomplete-root" name="field">
    <div class="MuiInputBase-root">
      <input class="MuiAutocomplete-input" role="combobox" id="test">
    </div>
  </div>
</div>
`;

// Valid autocomplete without name attribute but with label fallback
const VALID_WITH_LABEL_FALLBACK = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-18col2x" data-testid="autocomplete-field">
    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
      <label class="MuiFormLabel-root MuiInputLabel-root" for=":r21:" id=":r21:-label">Brands</label>
      <div class="MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot">
        <input id=":r21:" type="text" class="MuiAutocomplete-input" role="combobox" value="">
      </div>
    </div>
  </div>
</div>
`;

// Valid autocomplete with placeholder fallback (no name, no label)
const VALID_WITH_PLACEHOLDER_FALLBACK = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-18col2x" data-testid="autocomplete-field">
    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
      <div class="MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot">
        <input id=":r1k:" type="text" class="MuiAutocomplete-input" role="combobox" placeholder="Start typing to find language" value="">
      </div>
    </div>
  </div>
</div>
`;

// Valid multi-select autocomplete with chips
const VALID_MULTISELECT_WITH_CHIPS = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye">
  <div class="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-18col2x" data-testid="autocomplete-field">
    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43">
      <div class="MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot">
        <div class="MuiChip-root" data-testid="autocomplete-chip" data-tag-index="0">
          <span class="MuiChip-label">German</span>
        </div>
        <div class="MuiChip-root" data-testid="autocomplete-chip" data-tag-index="1">
          <span class="MuiChip-label">Arabic</span>
        </div>
        <input id=":r3x:" type="text" class="MuiAutocomplete-input" role="combobox" placeholder="Select languages" value="">
      </div>
    </div>
  </div>
</div>
`;

describe("autocomplete-field detector", () => {
  describe("valid detection", () => {
    it("detects valid autocomplete and extracts data", () => {
      const { el, $ } = createContext(VALID_AUTOCOMPLETE);
      const result = autocompleteFieldDetector.detect(el, $);

      const expectedMeta: AutocompleteFieldMeta = {
        input: ".MuiAutocomplete-input",
        clearIndicator: ".MuiAutocomplete-clearIndicator",
        options: '[role="presentation"] [role="option"]',
        values: '[data-testid="autocomplete-chip"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "autocomplete-field",
          path: '.MuiAutocomplete-root[name="additionalDeliveryTypes"]',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects autocomplete using label text when name attribute is missing", () => {
      const { el, $ } = createContext(VALID_WITH_LABEL_FALLBACK);
      const result = autocompleteFieldDetector.detect(el, $);

      const expectedMeta: AutocompleteFieldMeta = {
        input: ".MuiAutocomplete-input",
        clearIndicator: ".MuiAutocomplete-clearIndicator",
        options: '[role="presentation"] [role="option"]',
        values: '[data-testid="autocomplete-chip"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "autocomplete-field",
          path: '.MuiAutocomplete-root:has(label:text-is("Brands"))',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects autocomplete using placeholder when name and label are missing", () => {
      const { el, $ } = createContext(VALID_WITH_PLACEHOLDER_FALLBACK);
      const result = autocompleteFieldDetector.detect(el, $);

      const expectedMeta: AutocompleteFieldMeta = {
        input: ".MuiAutocomplete-input",
        clearIndicator: ".MuiAutocomplete-clearIndicator",
        options: '[role="presentation"] [role="option"]',
        values: '[data-testid="autocomplete-chip"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "autocomplete-field",
          path: '.MuiAutocomplete-root:has(input[placeholder="Start typing to find language"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects multi-select autocomplete with chips", () => {
      const { el, $ } = createContext(VALID_MULTISELECT_WITH_CHIPS);
      const result = autocompleteFieldDetector.detect(el, $);

      const expectedMeta: AutocompleteFieldMeta = {
        input: ".MuiAutocomplete-input",
        clearIndicator: ".MuiAutocomplete-clearIndicator",
        options: '[role="presentation"] [role="option"]',
        values: '[data-testid="autocomplete-chip"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "autocomplete-field",
          path: '.MuiAutocomplete-root:has(input[placeholder="Select languages"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong root tag", () => {
      const { el, $ } = createContext(INVALID_WRONG_TAG);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiAutocomplete-root", () => {
      const { el, $ } = createContext(INVALID_MISSING_AUTOCOMPLETE_ROOT);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing name, label, and placeholder", () => {
      const { el, $ } = createContext(INVALID_MISSING_NAME);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input element", () => {
      const { el, $ } = createContext(INVALID_MISSING_INPUT);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong input role", () => {
      const { el, $ } = createContext(INVALID_WRONG_ROLE);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input id", () => {
      const { el, $ } = createContext(INVALID_MISSING_INPUT_ID);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiFormControl-root class", () => {
      const { el, $ } = createContext(INVALID_MISSING_FORMCONTROL_CLASS);
      expect(autocompleteFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
