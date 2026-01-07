import { describe, expect, it } from "vitest";
import { asideSectionDetector } from "../../src/detectors/aside-section";
import type { AsideSectionMeta } from "../../src/detectors/aside-section";
import { createContext } from "../helpers";

// Valid aside section
const VALID_ASIDE = `<aside>
  <nav>
    <ul>
      <li>Menu item</li>
    </ul>
  </nav>
</aside>`;

// Invalid: wrong tag (div instead of aside)
const WRONG_TAG_DIV = `<div>
  <nav>Content</nav>
</div>`;

// Invalid: wrong tag (main instead of aside)
const WRONG_TAG_MAIN = `<main>
  <article>Content</article>
</main>`;

// Invalid: wrong tag (section instead of aside)
const WRONG_TAG_SECTION = `<section>
  <p>Content</p>
</section>`;

describe("aside-section detector", () => {
  describe("valid detection", () => {
    it("detects valid aside section", () => {
      const { el, $ } = createContext(VALID_ASIDE);
      const result = asideSectionDetector.detect(el, $);

      const expectedMeta: AsideSectionMeta = {};

      expect(result).not.toBeNull();
      expect(result!.node).toEqual({
        type: "section",
        kind: "aside-section",
        path: "aside",
        meta: expectedMeta,
      });
    });

    it("returns element children as childContainers", () => {
      const { el, $ } = createContext(VALID_ASIDE);
      const result = asideSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      // Should return children (the <nav>), not the element itself
      expect(result!.childContainers).toHaveLength(1);
      expect(result!.childContainers[0].tagName).toBe("nav");
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects div tag", () => {
      const { el, $ } = createContext(WRONG_TAG_DIV);
      expect(asideSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects main tag", () => {
      const { el, $ } = createContext(WRONG_TAG_MAIN);
      expect(asideSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects section tag", () => {
      const { el, $ } = createContext(WRONG_TAG_SECTION);
      expect(asideSectionDetector.detect(el, $)).toBeNull();
    });
  });
});
