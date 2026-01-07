import { describe, expect, it } from "vitest";
import { buttonFieldDetector } from "../../src/detectors/button-field";
import type { ButtonFieldMeta } from "../../src/detectors/button-field";
import { createContext } from "../helpers";

const VALID_BUTTON_WITH_ICON = `
<button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary css-bivbcb" tabindex="0" type="button">
  <span class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    </svg>
  </span>
  Add Link
  <span class="MuiTouchRipple-root css-w0pj6f"></span>
</button>
`;

const VALID_BUTTON_TEXT_ONLY = `
<button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" type="button">
  Submit
  <span class="MuiTouchRipple-root css-w0pj6f"></span>
</button>
`;

const VALID_BUTTON_END_ICON = `
<button class="MuiButtonBase-root MuiButton-root MuiButton-outlined" type="button">
  Next
  <span class="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium">
    <svg class="MuiSvgIcon-root" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  </span>
  <span class="MuiTouchRipple-root"></span>
</button>
`;

const INVALID_NOT_BUTTON = `
<div class="MuiButtonBase-root MuiButton-root">Click me</div>
`;

const INVALID_NOT_MUI_BUTTON = `
<button class="btn btn-primary">Click me</button>
`;

const INVALID_EMPTY_TEXT = `
<button class="MuiButtonBase-root MuiButton-root MuiButton-outlined" type="button">
  <span class="MuiTouchRipple-root"></span>
</button>
`;

describe("button-field detector", () => {
  describe("valid detection", () => {
    it("detects button with start icon and extracts label", () => {
      const { el, $ } = createContext(VALID_BUTTON_WITH_ICON);
      const result = buttonFieldDetector.detect(el, $);

      const expectedMeta: ButtonFieldMeta = {
        label: "Add Link",
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "button-field",
          path: 'button.MuiButton-root:text("Add Link")',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects text-only button", () => {
      const { el, $ } = createContext(VALID_BUTTON_TEXT_ONLY);
      const result = buttonFieldDetector.detect(el, $);

      expect(result?.node.meta.label).toBe("Submit");
      expect(result?.node.path).toBe('button.MuiButton-root:text("Submit")');
    });

    it("detects button with end icon", () => {
      const { el, $ } = createContext(VALID_BUTTON_END_ICON);
      const result = buttonFieldDetector.detect(el, $);

      expect(result?.node.meta.label).toBe("Next");
      expect(result?.node.path).toBe('button.MuiButton-root:text("Next")');
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects non-button element", () => {
      const { el, $ } = createContext(INVALID_NOT_BUTTON);
      expect(buttonFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects non-MUI button", () => {
      const { el, $ } = createContext(INVALID_NOT_MUI_BUTTON);
      expect(buttonFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects button with empty text", () => {
      const { el, $ } = createContext(INVALID_EMPTY_TEXT);
      expect(buttonFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
