import { describe, expect, it } from "vitest";
import { toggleFieldDetector } from "../../src/detectors/toggle-field";
import type { ToggleFieldMeta } from "../../src/detectors/toggle-field";
import { createContext } from "../helpers";

// Valid toggle - matches real HTML structure
const VALID_TOGGLE = `<label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd" data-testid="toggle-field">
  <span class="MuiSwitch-root MuiSwitch-sizeMedium">
    <span class="MuiSwitch-switchBase MuiSwitch-colorPrimary">
      <input type="checkbox" name="headerFullWidthLayout" />
      <span class="MuiSwitch-thumb"></span>
    </span>
    <span class="MuiSwitch-track"></span>
  </span>
  <span class="MuiFormControlLabel-label">Enable Full-Width Header</span>
</label>`;

// Invalid: wrong tag (div instead of label)
const WRONG_TAG = `<div class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" name="test" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</div>`;

// Invalid: missing data-testid
const MISSING_TESTID = `<label class="MuiFormControlLabel-root">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" name="test" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: wrong data-testid
const WRONG_TESTID = `<label class="MuiFormControlLabel-root" data-testid="select-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" name="test" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: missing MuiFormControlLabel-root class
const MISSING_CLASS = `<label data-testid="toggle-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" name="test" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: missing MuiSwitch-root
const MISSING_SWITCH_ROOT = `<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-switchBase">
    <input type="checkbox" name="test" />
  </span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: missing input name
const MISSING_INPUT_NAME = `<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: empty input name
const EMPTY_INPUT_NAME = `<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="checkbox" name="" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

// Invalid: input is not checkbox
const WRONG_INPUT_TYPE = `<label class="MuiFormControlLabel-root" data-testid="toggle-field">
  <span class="MuiSwitch-root"><span class="MuiSwitch-switchBase">
    <input type="text" name="test" />
  </span></span>
  <span class="MuiFormControlLabel-label">Label</span>
</label>`;

describe("toggle-field detector", () => {
  describe("valid detection", () => {
    it("detects valid toggle and extracts all data", () => {
      const { el, $ } = createContext(VALID_TOGGLE);
      const result = toggleFieldDetector.detect(el, $);

      const expectedMeta: ToggleFieldMeta = {
        input: 'input[name="headerFullWidthLayout"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "toggle-field",
          path: '[data-testid="toggle-field"]:has(input[name="headerFullWidthLayout"])',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (div instead of label)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(MISSING_TESTID);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong data-testid", () => {
      const { el, $ } = createContext(WRONG_TESTID);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiFormControlLabel-root class", () => {
      const { el, $ } = createContext(MISSING_CLASS);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiSwitch-root", () => {
      const { el, $ } = createContext(MISSING_SWITCH_ROOT);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing input name", () => {
      const { el, $ } = createContext(MISSING_INPUT_NAME);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects empty input name", () => {
      const { el, $ } = createContext(EMPTY_INPUT_NAME);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong input type", () => {
      const { el, $ } = createContext(WRONG_INPUT_TYPE);
      expect(toggleFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
