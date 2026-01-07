import { describe, expect, it } from "vitest";
import type { CtaButtonLinkMeta } from "../../src/detectors/cta-button-link";
import { dndItemSectionDetector } from "../../src/detectors/dnd-item-section";
import type { DndItemSectionMeta } from "../../src/detectors/dnd-item-section";
import { createContext } from "../helpers";

// Valid DnD item with all optional fields (expanded state with body)
const VALID_DND_ITEM_EXPANDED = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item1">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Link 1</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <button type="button" data-testid="card-toggle">
              <svg data-testid="ExpandLessIcon"></svg>
            </button>
            <label data-testid="toggle-field">
              <span class="MuiSwitch-root">
                <input type="checkbox" name="enabled" checked>
              </span>
            </label>
            <button type="button">
              <svg data-testid="ClearIcon"></svg>
            </button>
          </div>
        </div>
        <div class="Card_body__g8vEX">
          <div class="FormFieldWrapper_wrapper__1reXs">
            <div data-testid="form-field-wrapper">Content here</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Valid DnD item with all optional fields (collapsed state without body)
const VALID_DND_ITEM_COLLAPSED = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item2">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Link 2</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <button type="button" data-testid="card-toggle">
              <svg data-testid="ExpandMoreIcon"></svg>
            </button>
            <label data-testid="toggle-field">
              <span class="MuiSwitch-root">
                <input type="checkbox" name="enabled">
              </span>
            </label>
            <button type="button">
              <svg data-testid="ClearIcon"></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Valid DnD item with title only (minimal case - no optional fields)
const VALID_DND_ITEM_TITLE_ONLY = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item3">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Minimal Item</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Valid DnD item with title + enabled switch only
const VALID_DND_ITEM_WITH_ENABLED = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item4">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">CTA Button Link</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <label data-testid="toggle-field">
              <span class="MuiSwitch-root">
                <input type="checkbox" name="alertBanner.buttons.0.enabled" checked>
              </span>
            </label>
          </div>
        </div>
        <div class="Card_body__g8vEX">
          <div class="FormFieldWrapper_wrapper__1reXs">
            <div data-testid="form-field-wrapper">Body content</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Valid DnD item with title + remove button only
const VALID_DND_ITEM_WITH_REMOVE = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item5">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Removable Item</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <button type="button">
              <svg data-testid="ClearIcon"></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Valid DnD item with title + toggle button only
const VALID_DND_ITEM_WITH_TOGGLE = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="item6">
  <div class="FormFieldWrapper_wrapper__1reXs">
    <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
      <div class="MuiPaper-root Card_wrapper__Elhl4">
        <div class="Card_header__Udn-I">
          <div class="Card_headerLeft__LhSq5">
            <span class="Card_heading__8mN0R">Collapsible Item</span>
          </div>
          <div class="Card_headerRight__xbLIV">
            <button type="button" data-testid="card-toggle">
              <svg data-testid="ExpandLessIcon"></svg>
            </button>
          </div>
        </div>
        <div class="Card_body__g8vEX">
          <div>Body content</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Invalid: wrong tag (section instead of div)
const WRONG_TAG = `<section data-testid="dnd-draggable-item">
  <div class="Card_wrapper__Elhl4">
    <div class="Card_header__Udn-I">
      <span class="Card_heading__8mN0R">Title</span>
    </div>
  </div>
</section>`;

// Invalid: missing data-testid
const MISSING_TESTID = `<div data-rbd-draggable-id="item1">
  <div class="Card_wrapper__Elhl4">
    <div class="Card_header__Udn-I">
      <span class="Card_heading__8mN0R">Title</span>
    </div>
  </div>
</div>`;

// Invalid: wrong testid value
const WRONG_TESTID = `<div data-testid="draggable-item" data-rbd-draggable-id="item1">
  <div class="Card_wrapper__Elhl4">
    <div class="Card_header__Udn-I">
      <span class="Card_heading__8mN0R">Title</span>
    </div>
  </div>
</div>`;

// Invalid: missing Card wrapper
const MISSING_CARD = `<div data-testid="dnd-draggable-item">
  <div class="Card_header__Udn-I">
    <span class="Card_heading__8mN0R">Title</span>
  </div>
</div>`;

// Invalid: missing Card header
const MISSING_HEADER = `<div data-testid="dnd-draggable-item">
  <div class="Card_wrapper__Elhl4">
    <div class="Card_body__g8vEX">Content</div>
  </div>
</div>`;

// Invalid: missing title/heading
const MISSING_TITLE = `<div data-testid="dnd-draggable-item">
  <div class="Card_wrapper__Elhl4">
    <div class="Card_header__Udn-I">
      <button><svg data-testid="ExpandLessIcon"></svg></button>
      <button><svg data-testid="ClearIcon"></svg></button>
    </div>
  </div>
</div>`;

describe("dnd-item-section detector", () => {
  describe("valid detection", () => {
    it("detects valid expanded DnD item with all optional fields", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_EXPANDED);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
        enabled:
          '[class*="Card_header__"] [data-testid="toggle-field"] input[type="checkbox"]',
        remove: 'button:has([data-testid="ClearIcon"])',
        collapse: 'button:has([data-testid="ExpandLessIcon"])',
      };

      expect(result).not.toBeNull();
      expect(result?.node).toEqual({
        type: "section",
        kind: "dnd-item-section",
        path: '[data-testid="dnd-draggable-item"]',
        meta: expectedMeta,
      });
    });

    it("detects valid collapsed DnD item with all optional fields", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_COLLAPSED);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
        enabled:
          '[class*="Card_header__"] [data-testid="toggle-field"] input[type="checkbox"]',
        remove: 'button:has([data-testid="ClearIcon"])',
        expand: 'button:has([data-testid="ExpandMoreIcon"])',
      };

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.node.meta).toEqual(expectedMeta);
    });

    it("detects valid DnD item with title only (minimal case)", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_TITLE_ONLY);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
      };

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.node.meta).toEqual(expectedMeta);
    });

    it("detects valid DnD item with title + enabled switch", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_WITH_ENABLED);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
        enabled:
          '[class*="Card_header__"] [data-testid="toggle-field"] input[type="checkbox"]',
      };

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.node.meta).toEqual(expectedMeta);
    });

    it("detects valid DnD item with title + remove button", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_WITH_REMOVE);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
        remove: 'button:has([data-testid="ClearIcon"])',
      };

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.node.meta).toEqual(expectedMeta);
    });

    it("detects valid DnD item with title + toggle button", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_WITH_TOGGLE);
      const result = dndItemSectionDetector.detect(el, $);

      const expectedMeta: DndItemSectionMeta = {
        title: '[class*="Card_heading__"]',
        body: '[class*="Card_body__"]',
        collapse: 'button:has([data-testid="ExpandLessIcon"])',
      };

      expect(result).not.toBeNull();
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.node.meta).toEqual(expectedMeta);
    });

    it("returns Card_body as childContainer for expanded item", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_EXPANDED);
      const result = dndItemSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.childContainers).toHaveLength(1);
      expect(result?.childContainers[0].tagName).toBe("div");
      expect($(result?.childContainers[0]).attr("class")).toContain(
        "Card_body__",
      );
    });

    it("returns empty childContainers for collapsed item (no body)", () => {
      const { el, $ } = createContext(VALID_DND_ITEM_COLLAPSED);
      const result = dndItemSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.childContainers).toHaveLength(0);
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects wrong tag (section instead of div)", () => {
      const { el, $ } = createContext(WRONG_TAG);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(MISSING_TESTID);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects wrong testid value", () => {
      const { el, $ } = createContext(WRONG_TESTID);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing Card wrapper", () => {
      const { el, $ } = createContext(MISSING_CARD);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing Card header", () => {
      const { el, $ } = createContext(MISSING_HEADER);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing title/heading", () => {
      const { el, $ } = createContext(MISSING_TITLE);
      expect(dndItemSectionDetector.detect(el, $)).toBeNull();
    });
  });

  describe("CTA delegation", () => {
    // CTA wrapped in dnd-draggable-item - should return cta-button-link, not dnd-item-section
    const CTA_IN_DND_ITEM = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="cta1">
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <div class="MuiPaper-root MuiPaper-elevation Card_wrapper__Elhl4">
            <div class="Card_header__Udn-I">
              <div class="Card_headerLeft__LhSq5">
                <span class="Card_heading__8mN0R">CTA Button Link</span>
              </div>
              <div class="Card_headerRight__xbLIV">
                <button type="button" data-testid="card-toggle">
                  <svg data-testid="ExpandLessIcon"></svg>
                </button>
                <div class="FormFieldWrapper_wrapper__1reXs">
                  <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
                    <label class="MuiFormControlLabel-root" data-testid="toggle-field">
                      <span class="MuiSwitch-root">
                        <input class="MuiSwitch-input" name="alertBanner.buttons.0.enabled" type="checkbox" checked="">
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="Card_body__g8vEX">
              <div data-testid="select-field" class="MuiInputBase-root">
                <div role="combobox" id="mui-component-select-alertBanner.buttons.0.selectType"></div>
                <input name="alertBanner.buttons.0.selectType" value="NONE">
              </div>
              <div role="group" name="alertBanner.buttons.0.colorStyle">
                <button value="STYLE_1" aria-pressed="true">1</button>
              </div>
              <div role="group" name="alertBanner.buttons.0.size">
                <button value="SMALL" aria-pressed="true">S</button>
              </div>
              <div role="group" name="alertBanner.buttons.0.variant">
                <button value="TEXT" aria-pressed="true">Text</button>
              </div>
              <input name="alertBanner.buttons.0.openInNewTabEnabled" type="checkbox">
            </div>
          </div>
        </div>
      </div>
    </div>`;

    // Plain dnd-item with regular fields - should return dnd-item-section
    const PLAIN_DND_ITEM_WITH_FIELDS = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="plain1">
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <div class="MuiPaper-root Card_wrapper__Elhl4">
            <div class="Card_header__Udn-I">
              <div class="Card_headerLeft__LhSq5">
                <span class="Card_heading__8mN0R">Navigation Link</span>
              </div>
            </div>
            <div class="Card_body__g8vEX">
              <div data-testid="text-field">
                <input name="links.0.text" type="text">
              </div>
              <div data-testid="toggle-field">
                <input name="links.0.openInNewTab" type="checkbox">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    // Empty dnd-item - should return dnd-item-section with empty children
    const EMPTY_DND_ITEM = `<div data-testid="dnd-draggable-item" data-rbd-draggable-id="empty1">
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <div class="MuiPaper-root Card_wrapper__Elhl4">
            <div class="Card_header__Udn-I">
              <div class="Card_headerLeft__LhSq5">
                <span class="Card_heading__8mN0R">Empty Card</span>
              </div>
            </div>
            <div class="Card_body__g8vEX">
            </div>
          </div>
        </div>
      </div>
    </div>`;

    it("detects CTA and returns cta-button-link (replaces dnd-item)", () => {
      const { el, $ } = createContext(CTA_IN_DND_ITEM);
      const result = dndItemSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.type).toBe("field");
      expect(result?.node.kind).toBe("cta-button-link");
      expect(result?.childContainers).toEqual([]);

      // Verify CTA meta structure
      const meta = result?.node.meta as CtaButtonLinkMeta;
      expect(meta.enabled).toBe('input[name$="enabled"]');
      expect(meta.collapse).toBe('button:has([data-testid="ExpandLessIcon"])');
      expect(meta.fields.callToAction.input).toBe('input[name$="selectType"]');
    });

    it("returns dnd-item-section for plain items (not CTA)", () => {
      const { el, $ } = createContext(PLAIN_DND_ITEM_WITH_FIELDS);
      const result = dndItemSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.type).toBe("section");
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.childContainers).toHaveLength(1);
    });

    it("returns dnd-item-section with body for empty items", () => {
      const { el, $ } = createContext(EMPTY_DND_ITEM);
      const result = dndItemSectionDetector.detect(el, $);

      expect(result).not.toBeNull();
      expect(result?.node.type).toBe("section");
      expect(result?.node.kind).toBe("dnd-item-section");
      expect(result?.childContainers).toHaveLength(1); // Card_body exists, just empty
    });
  });
});
