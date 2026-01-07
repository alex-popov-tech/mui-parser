import { describe, expect, it } from "vitest";
import { dndAreaSectionDetector } from "../../src/detectors/dnd-area-section";
import { createContext } from "../helpers";

// Valid DnD area with items
const VALID_DND_AREA = `<div data-testid="dnd-droppable-area" data-rbd-droppable-id="dnd-droppable-id" data-rbd-droppable-context-id="0">
  <div data-testid="dnd-draggable-item" data-rbd-draggable-id="item1">
    <div class="Card_wrapper__Elhl4">Content 1</div>
  </div>
  <div data-testid="dnd-draggable-item" data-rbd-draggable-id="item2">
    <div class="Card_wrapper__Elhl4">Content 2</div>
  </div>
</div>`;

// Valid DnD area with no items (still valid for area detector)
const VALID_DND_AREA_EMPTY = `<div data-testid="dnd-droppable-area" data-rbd-droppable-id="dnd-droppable-id">
</div>`;

// Invalid: wrong tag (section instead of div)
const WRONG_TAG = `<section data-testid="dnd-droppable-area" data-rbd-droppable-id="dnd-droppable-id">
  <div data-testid="dnd-draggable-item">Content</div>
</section>`;

// Invalid: missing data-testid
const MISSING_TESTID = `<div data-rbd-droppable-id="dnd-droppable-id">
  <div data-testid="dnd-draggable-item">Content</div>
</div>`;

// Invalid: missing droppable-id
const MISSING_DROPPABLE_ID = `<div data-testid="dnd-droppable-area">
  <div data-testid="dnd-draggable-item">Content</div>
</div>`;

// Invalid: wrong testid value
const WRONG_TESTID = `<div data-testid="droppable-area" data-rbd-droppable-id="dnd-droppable-id">
  <div data-testid="dnd-draggable-item">Content</div>
</div>`;

describe("dnd-area-section detector", () => {
  describe("valid detection", () => {
    it("detects valid DnD area section", () => {
      const { el, $ } = createContext(VALID_DND_AREA);
      const result = dndAreaSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result!.node).toEqual({
        type: "section",
        kind: "dnd-area-section",
        path: '[data-testid="dnd-droppable-area"]',
      });
    });

    it("has no meta (purely structural)", () => {
      const { el, $ } = createContext(VALID_DND_AREA);
      const result = dndAreaSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result!.node.meta).toBeUndefined();
    });

    it("returns draggable items as childContainers", () => {
      const { el, $ } = createContext(VALID_DND_AREA);
      const result = dndAreaSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result!.childContainers).toHaveLength(2);
      expect($(result!.childContainers[0]).attr("data-testid")).toBe(
        "dnd-draggable-item"
      );
      expect($(result!.childContainers[1]).attr("data-testid")).toBe(
        "dnd-draggable-item"
      );
    });

    it("detects empty area (no items)", () => {
      const { el, $ } = createContext(VALID_DND_AREA_EMPTY);
      const result = dndAreaSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result!.childContainers).toHaveLength(0);
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (section instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(dndAreaSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(MISSING_TESTID);
      expect(dndAreaSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing droppable-id", () => {
      const { el, $ } = createContext(MISSING_DROPPABLE_ID);
      expect(dndAreaSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong testid value", () => {
      const { el, $ } = createContext(WRONG_TESTID);
      expect(dndAreaSectionDetector.detect(el, $)).toBeNull();
    });
  });
});
