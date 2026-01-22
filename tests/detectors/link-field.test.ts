import { describe, expect, it } from "vitest";
import { linkFieldDetector } from "../../src/detectors/link-field";
import type { LinkFieldMeta } from "../../src/detectors/link-field";
import { createContext } from "../helpers";

const VALID_LINK_WITH_ICON = `
<a class="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" data-testid="add-nav-bar-custom-link-action" href="/admin/events/123/site-builder/v2/nav-bar/custom-link?locale=en">
  <span class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium">
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    </svg>
  </span>
  Add Custom Link
  <span class="MuiTouchRipple-root"></span>
</a>
`;

const VALID_LINK_TEXT_ONLY = `
<a class="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" data-testid="add-nav-bar-dropdown-group-action" href="/admin/events/123/site-builder/v2/nav-bar/group?locale=en">
  Add Dropdown Group
  <span class="MuiTouchRipple-root"></span>
</a>
`;

const INVALID_NOT_ANCHOR = `
<button class="MuiButtonBase-root MuiButton-root MuiButton-text" data-testid="add-nav-bar-custom-link-action">
  Add Custom Link
</button>
`;

const INVALID_MISSING_TESTID = `
<a class="MuiButtonBase-root MuiButton-root MuiButton-text" href="/admin/events/123/site-builder/v2/nav-bar/custom-link?locale=en">
  Add Custom Link
</a>
`;

const INVALID_MISSING_HREF = `
<a class="MuiButtonBase-root MuiButton-root MuiButton-text" data-testid="add-nav-bar-custom-link-action">
  Add Custom Link
</a>
`;

const INVALID_EMPTY_TEXT = `
<a class="MuiButtonBase-root MuiButton-root MuiButton-text" data-testid="add-nav-bar-custom-link-action" href="/admin/events/123/site-builder/v2/nav-bar/custom-link?locale=en">
  <span class="MuiTouchRipple-root"></span>
</a>
`;

describe("link-field detector", () => {
  describe("valid detection", () => {
    it("detects link with icon and extracts label", () => {
      const { el, $ } = createContext(VALID_LINK_WITH_ICON);
      const result = linkFieldDetector.detect(el, $);

      const expectedMeta: LinkFieldMeta = {
        label: "Add Custom Link",
      };

      expect(result).toEqual({
        node: {
          type: "field",
          kind: "link-field",
          path: 'a.MuiButton-root[data-testid="add-nav-bar-custom-link-action"]',
          meta: expectedMeta,
        },
        childContainers: [],
      });
    });

    it("detects text-only link", () => {
      const { el, $ } = createContext(VALID_LINK_TEXT_ONLY);
      const result = linkFieldDetector.detect(el, $);
      const meta = result?.node.meta as LinkFieldMeta | undefined;

      expect(meta?.label).toBe("Add Dropdown Group");
      expect(result?.node.path).toBe(
        'a.MuiButton-root[data-testid="add-nav-bar-dropdown-group-action"]',
      );
    });
  });

  describe("strict validation rejects invalid structures", () => {
    it("rejects non-anchor element", () => {
      const { el, $ } = createContext(INVALID_NOT_ANCHOR);
      expect(linkFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing data-testid", () => {
      const { el, $ } = createContext(INVALID_MISSING_TESTID);
      expect(linkFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects missing href", () => {
      const { el, $ } = createContext(INVALID_MISSING_HREF);
      expect(linkFieldDetector.detect(el, $)).toBeNull();
    });

    it("rejects link with empty text", () => {
      const { el, $ } = createContext(INVALID_EMPTY_TEXT);
      expect(linkFieldDetector.detect(el, $)).toBeNull();
    });
  });
});
