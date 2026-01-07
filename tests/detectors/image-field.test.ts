import { describe, expect, it } from "vitest";
import { imageFieldDetector } from "../../src/detectors/image-field";
import type { ImageFieldMeta } from "../../src/detectors/image-field";
import { createContext } from "../helpers";

// Valid image field with image uploaded
const VALID_WITH_IMAGE = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary ImageField_label__ieAH css-14wmy0l" data-shrink="false">Logo</label>
  <div class="ImagePreview_previewWrapper__L8VDB">
    <img src="/caas/content/api/v1/admin/files/informa-771bc30ba8b987da64c92a52c35597be.png" alt="Preview" class="ImagePreview_previewImage__U5JlM">
  </div>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedError" tabindex="0" type="button" data-testid="file-remove-action">Remove</button>
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" role="button" data-testid="file-change-action">Change file</span>
    </label>
  </div>
</div>`;

// Valid image field without image (default state)
const VALID_WITHOUT_IMAGE = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary ImageField_label__ieAH css-14wmy0l" data-shrink="false">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" role="button" data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Valid with different label text
const VALID_DIFFERENT_LABEL = `<div class="ImageField_wrapper__abc123">
  <label class="MuiFormLabel-root MuiInputLabel-root">Banner Image</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: wrong tag (span instead of div)
const WRONG_TAG = `<span class="ImageField_wrapper__JDqhr">
  <label class="MuiInputLabel-root">Logo</label>
  <input type="file" data-testid="file-input">
  <span data-testid="file-change-action">Choose file</span>
</span>`;

// Invalid: missing ImageField_wrapper class
const MISSING_WRAPPER_CLASS = `<div class="SomeOther_wrapper__JDqhr">
  <label class="MuiInputLabel-root">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: missing label with MuiInputLabel-root
const MISSING_LABEL = `<div class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: empty label text
const EMPTY_LABEL_TEXT = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiInputLabel-root">   </label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: missing file input
const MISSING_FILE_INPUT = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiInputLabel-root">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: wrong input type
const WRONG_INPUT_TYPE = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiInputLabel-root">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="text" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: missing upload button
const MISSING_UPLOAD_BUTTON = `<div class="ImageField_wrapper__JDqhr">
  <label class="MuiInputLabel-root">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
    </label>
  </div>
</div>`;

describe("image-field detector", () => {
  describe("valid detection", () => {
    it("detects valid image field with uploaded image", () => {
      const { el, $ } = createContext(VALID_WITH_IMAGE);
      const result = imageFieldDetector.detect(el, $);

      const expectedMeta: ImageFieldMeta = {
        label: "label.MuiInputLabel-root",
        preview: 'img[class*="ImagePreview_previewImage"]',
        fileInput: 'input[data-testid="file-input"]',
        uploadButton: '[data-testid="file-change-action"]',
        removeButton: '[data-testid="file-remove-action"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "image-field",
          path: 'div[class*="ImageField_wrapper"]:has-text("Logo")',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects valid image field without image (default state)", () => {
      const { el, $ } = createContext(VALID_WITHOUT_IMAGE);
      const result = imageFieldDetector.detect(el, $);

      const expectedMeta: ImageFieldMeta = {
        label: "label.MuiInputLabel-root",
        preview: 'img[class*="ImagePreview_previewImage"]',
        fileInput: 'input[data-testid="file-input"]',
        uploadButton: '[data-testid="file-change-action"]',
        removeButton: '[data-testid="file-remove-action"]',
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "image-field",
          path: 'div[class*="ImageField_wrapper"]:has-text("Logo")',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects image field with different label text", () => {
      const { el, $ } = createContext(VALID_DIFFERENT_LABEL);
      const result = imageFieldDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.path).toBe(
        'div[class*="ImageField_wrapper"]:has-text("Banner Image")',
      );
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (span instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing ImageField_wrapper class", () => {
      const { el, $ } = createContext(MISSING_WRAPPER_CLASS);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing label with MuiInputLabel-root", () => {
      const { el, $ } = createContext(MISSING_LABEL);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects empty label text", () => {
      const { el, $ } = createContext(EMPTY_LABEL_TEXT);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing file input", () => {
      const { el, $ } = createContext(MISSING_FILE_INPUT);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong input type", () => {
      const { el, $ } = createContext(WRONG_INPUT_TYPE);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing upload button", () => {
      const { el, $ } = createContext(MISSING_UPLOAD_BUTTON);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
