import { describe, expect, it } from "vitest";
import { mainSectionDetector } from "../../src/detectors/main-section";
import type { MainSectionMeta } from "../../src/detectors/main-section";
import { createContext } from "../helpers";

// Valid main section
const VALID_MAIN = `<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>`;

// Invalid: wrong tag (div instead of main)
const WRONG_TAG_DIV = `<div>
  <article>Content</article>
</div>`;

// Invalid: wrong tag (aside instead of main)
const WRONG_TAG_ASIDE = `<aside>
  <nav>Content</nav>
</aside>`;

// Invalid: wrong tag (section instead of main)
const WRONG_TAG_SECTION = `<section>
  <p>Content</p>
</section>`;

describe("main-section detector", () => {
  describe("valid detection", () => {
    it("detects valid main section", () => {
      const { el, $ } = createContext(VALID_MAIN);
      const result = mainSectionDetector.detect(el, $);

      const expectedMeta: MainSectionMeta = {};

      expect(result).not.toBeNull();
      expect(result!.node).toEqual({
        type: "section",
        kind: "main-section",
        path: "main",
        meta: expectedMeta,
      });
    });

    it("returns element children as childContainers", () => {
      const { el, $ } = createContext(VALID_MAIN);
      const result = mainSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      // Should return children (the <article>), not the element itself
      expect(result!.childContainers).toHaveLength(1);
      expect(result!.childContainers[0].tagName).toBe("article");
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects div tag", () => {
      const { el, $ } = createContext(WRONG_TAG_DIV);
      expect(mainSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects aside tag", () => {
      const { el, $ } = createContext(WRONG_TAG_ASIDE);
      expect(mainSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects section tag", () => {
      const { el, $ } = createContext(WRONG_TAG_SECTION);
      expect(mainSectionDetector.detect(el, $)).toBeNull();
    });
  });
});
