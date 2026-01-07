import { describe, expect, it } from "vitest";
import { formSectionDetector } from "../../src/detectors/form-section";
import type { FormSectionMeta } from "../../src/detectors/form-section";
import { createContext } from "../helpers";

// Valid form section - matches real HTML structure
const VALID_FORM_SECTION = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl">
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <!-- Field content here -->
        </div>
      </div>
    </div>
  </div>
</section>`;

// Invalid: wrong tag (div instead of section)
const WRONG_TAG = `<div class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</div>`;

// Invalid: missing FormSection_wrapper__ class
const MISSING_WRAPPER_CLASS = `<section class="SomeOther_wrapper__abc">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</section>`;

// Invalid: missing title h2
const MISSING_TITLE = `<section class="FormSection_wrapper__uqhuu">
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</section>`;

// Invalid: title with wrong class
const WRONG_TITLE_CLASS = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="SomeOther_title__xyz">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</section>`;

// Invalid: empty title
const EMPTY_TITLE = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">   </h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</section>`;

// Invalid: missing body wrapper
const MISSING_BODY_WRAPPER = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_body__PFarl"></div>
</section>`;

// Invalid: missing body
const MISSING_BODY = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
  </div>
</section>`;

// Invalid: multiple titles
const MULTIPLE_TITLES = `<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">First Title</h2>
  <h2 class="FormSection_title__xyz123">Second Title</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl"></div>
  </div>
</section>`;

describe("form-section detector", () => {
  describe("valid detection", () => {
    it("detects valid form section and extracts all data", () => {
      const { el, $ } = createContext(VALID_FORM_SECTION);
      const result = formSectionDetector.detect(el, $);

      const expectedMeta: FormSectionMeta = {
        title: 'h2[class*="FormSection_title__"]',
        body: 'div[class*="FormSection_body__"]',
        fields: '[data-testid="form-field-wrapper"]',
      };

      expect(result).not.toBeNull();
      expect(result?.node).toEqual({
        type: "section",
        kind: "form-section",
        path: 'section[class*="FormSection_wrapper__"]:has(h2:text-is("Event Setup"))',
        meta: expectedMeta,
      });
    });

    it("returns body element as childContainer", () => {
      const { el, $ } = createContext(VALID_FORM_SECTION);
      const result = formSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.childContainers).toHaveLength(1);
      expect(result?.childContainers[0].tagName).toBe("div");
      expect($(result?.childContainers[0]).attr("class")).toContain(
        "FormSection_body__",
      );
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (div instead of section)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing FormSection_wrapper__ class", () => {
      const { el, $ } = createContext(MISSING_WRAPPER_CLASS);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing title h2", () => {
      const { el, $ } = createContext(MISSING_TITLE);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects title with wrong class", () => {
      const { el, $ } = createContext(WRONG_TITLE_CLASS);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects empty title", () => {
      const { el, $ } = createContext(EMPTY_TITLE);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing body wrapper", () => {
      const { el, $ } = createContext(MISSING_BODY_WRAPPER);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing body", () => {
      const { el, $ } = createContext(MISSING_BODY);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects multiple titles", () => {
      const { el, $ } = createContext(MULTIPLE_TITLES);
      expect(formSectionDetector.detect(el, $)).toBeNull();
    });
  });
});
