import { describe, expect, it } from "vitest";
import { textEditorFieldDetector } from "../../src/detectors/text-editor-field";
import type { TextEditorFieldMeta } from "../../src/detectors/text-editor-field";
import { createContext } from "../helpers";

const VALID_TEXT_EDITOR_FIELD = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye" data-testid="text-editor-field">
  <label class="MuiFormLabel-root MuiFormLabel-colorPrimary css-1ib89cd">Date and Venue Info</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box fr-basic fr-top" role="application">
      <div class="fr-toolbar fr-desktop fr-top fr-basic">
        <div class="fr-btn-grp fr-float-left">
          <button id="bold-1" type="button" tabindex="-1" role="button" class="fr-command fr-btn" data-cmd="bold">
            <span class="fr-sr-only">Bold</span>
          </button>
        </div>
      </div>
      <div class="fr-wrapper show-placeholder" dir="auto">
        <div class="fr-element fr-view" dir="auto" contenteditable="true" style="min-height: 200px;" aria-disabled="false" spellcheck="true">
          <p><br></p>
        </div>
        <span class="fr-placeholder">Formatted text is allowed here...</span>
      </div>
      <div class="fr-second-toolbar"></div>
    </div>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f"></p>
</div>
`;

const VALID_TEXT_EDITOR_FIELD_WITH_CONTENT = `
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye" data-testid="text-editor-field">
  <label class="MuiFormLabel-root MuiFormLabel-colorPrimary css-1ib89cd">Description</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box fr-basic fr-top" role="application">
      <div class="fr-toolbar fr-desktop fr-top fr-basic"></div>
      <div class="fr-wrapper" dir="auto">
        <div class="fr-element fr-view" dir="auto" contenteditable="true" style="min-height: 200px;">
          <p>Some <strong>formatted</strong> content here.</p>
        </div>
      </div>
      <div class="fr-second-toolbar"></div>
    </div>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f"></p>
</div>
`;

const INVALID_WRONG_TESTID = `
<div class="MuiFormControl-root MuiFormControl-fullWidth" data-testid="wrong-testid">
  <label class="MuiFormLabel-root">Label</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box">
      <div class="fr-wrapper">
        <div class="fr-element fr-view" contenteditable="true"><p><br></p></div>
      </div>
    </div>
  </div>
</div>
`;

const INVALID_MISSING_LABEL = `
<div class="MuiFormControl-root MuiFormControl-fullWidth" data-testid="text-editor-field">
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box">
      <div class="fr-wrapper">
        <div class="fr-element fr-view" contenteditable="true"><p><br></p></div>
      </div>
    </div>
  </div>
</div>
`;

const INVALID_MISSING_EDITOR = `
<div class="MuiFormControl-root MuiFormControl-fullWidth" data-testid="text-editor-field">
  <label class="MuiFormLabel-root">Label</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box">
      <div class="fr-wrapper">
        <!-- Missing contenteditable editor -->
      </div>
    </div>
  </div>
</div>
`;

const INVALID_WRONG_TAG = `
<span class="MuiFormControl-root" data-testid="text-editor-field">
  <label class="MuiFormLabel-root">Label</label>
</span>
`;

const INVALID_MISSING_FORMCONTROL_CLASS = `
<div class="some-other-class" data-testid="text-editor-field">
  <label class="MuiFormLabel-root">Label</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box">
      <div class="fr-wrapper">
        <div class="fr-element fr-view" contenteditable="true"><p><br></p></div>
      </div>
    </div>
  </div>
</div>
`;

describe("text-editor-field detector", () => {
  describe("valid detection", () => {
    it("detects valid text-editor-field with empty content", () => {
      const { el, $ } = createContext(VALID_TEXT_EDITOR_FIELD);
      const result = textEditorFieldDetector.detect(el, $);

      const expectedMeta: TextEditorFieldMeta = {
        label: "label.MuiFormLabel-root",
        editor: 'div.fr-element.fr-view[contenteditable="true"]',
        helperText: "p.MuiFormHelperText-root",
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "text-editor-field",
          path: '[data-testid="text-editor-field"]:has(label:text-is("Date and Venue Info"))',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects valid text-editor-field with content", () => {
      const { el, $ } = createContext(VALID_TEXT_EDITOR_FIELD_WITH_CONTENT);
      const result = textEditorFieldDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("text-editor-field");
      expect(result?.node.path).toBe(
        '[data-testid="text-editor-field"]:has(label:text-is("Description"))',
      );
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong data-testid", () => {
      const { el, $ } = createContext(INVALID_WRONG_TESTID);
      expect(textEditorFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing label", () => {
      const { el, $ } = createContext(INVALID_MISSING_LABEL);
      expect(textEditorFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing editor", () => {
      const { el, $ } = createContext(INVALID_MISSING_EDITOR);
      expect(textEditorFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong tag", () => {
      const { el, $ } = createContext(INVALID_WRONG_TAG);
      expect(textEditorFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing MuiFormControl-root class", () => {
      const { el, $ } = createContext(INVALID_MISSING_FORMCONTROL_CLASS);
      expect(textEditorFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
