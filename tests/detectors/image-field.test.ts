import { describe, expect, it } from "vitest";
import { imageFieldDetector } from "../../src/detectors/image-field";
import type { ImageFieldMeta } from "../../src/detectors/image-field";
import { createContext } from "../helpers";

// Valid image field without image (default state from tmp/input.html)
const VALID_DEFAULT = `<div class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1bty08p" tabindex="0" role="button" data-testid="file-change-action">Choose file<span class="MuiTouchRipple-root css-w0pj6f"></span></span>
    </label>
  </div>
</div>`;

// Valid image field with uploaded image (preview visible)
const VALID_WITH_IMAGE = `<div class="ImageField_wrapper__JDqhr">
  <div class="ImagePreview_previewWrapper__L8VDB">
    <img src="/api/files/image-abc123.png" alt="Preview" class="ImagePreview_previewImage__U5JlM">
  </div>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span data-testid="file-change-action">Change file</span>
    </label>
  </div>
</div>`;

// Valid with different hash suffix in class
const VALID_DIFFERENT_HASH = `<div class="ImageField_wrapper__abc123">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: wrong tag (span instead of div)
const WRONG_TAG = `<span class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</span>`;

// Invalid: missing ImageField class
const MISSING_WRAPPER_CLASS = `<div class="SomeOther_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: missing file input
const MISSING_FILE_INPUT = `<div class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

// Invalid: wrong input type
const WRONG_INPUT_TYPE = `<div class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="text" data-testid="file-input">
      <span data-testid="file-change-action">Choose file</span>
    </label>
  </div>
</div>`;

describe("image-field detector", () => {
  describe("valid detection", () => {
    it("detects image field in default state (no image)", () => {
      const { el, $ } = createContext(VALID_DEFAULT);
      const result = imageFieldDetector.detect(el, $);

      const expectedMeta: ImageFieldMeta = {
        input: 'input[type="file"]',
        img: "img",
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "image-field",
          path: '[class^="ImageField"]',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects image field with uploaded image", () => {
      const { el, $ } = createContext(VALID_WITH_IMAGE);
      const result = imageFieldDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("image-field");
      expect(result?.node.meta).toEqual({
        input: 'input[type="file"]',
        img: "img",
      });
    });

    it("detects image field with different class hash", () => {
      const { el, $ } = createContext(VALID_DIFFERENT_HASH);
      const result = imageFieldDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.path).toBe('[class^="ImageField"]');
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (span instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(imageFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing ImageField class", () => {
      const { el, $ } = createContext(MISSING_WRAPPER_CLASS);
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
  });
});
