import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import { ctaButtonLinkDetector } from "../cta-button-link";
import type { DndItemSectionMeta } from "./types";
import { validate } from "./validate";

export const dndItemSectionDetector: Detector = {
  name: "dnd-item-section",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    const $el = $(el);

    // Try CTA detection first - CTA replaces dnd-item entirely (same Card structure)
    const cardWrapper = $el.find('[class*="Card_wrapper__"]').get(0) as
      | Element
      | undefined;
    if (cardWrapper) {
      const ctaResult = ctaButtonLinkDetector.detect(cardWrapper, $);
      if (ctaResult) {
        return ctaResult;
      }
    }

    // Fallback: Get Card_body as child container for recursive parsing
    const childContainers: Element[] = [];
    const body = $el.find('[class*="Card_body__"]').get(0) as
      | Element
      | undefined;
    if (body) {
      childContainers.push(body);
    }

    // Check for optional elements in header
    const header = $el.find('[class*="Card_header__"]');
    const hasEnabled = header.find('[data-testid="toggle-field"]').length > 0;
    const hasRemove = header.find('[data-testid="ClearIcon"]').length > 0;
    const hasExpand = header.find('[data-testid="ExpandMoreIcon"]').length > 0;
    const hasCollapse =
      header.find('[data-testid="ExpandLessIcon"]').length > 0;

    const meta: DndItemSectionMeta = {
      title: '[class*="Card_heading__"]',
      body: '[class*="Card_body__"]',
      ...(hasEnabled && {
        enabled:
          '[class*="Card_header__"] [data-testid="toggle-field"] input[type="checkbox"]',
      }),
      ...(hasRemove && { remove: 'button:has([data-testid="ClearIcon"])' }),
      ...(hasExpand && {
        expand: 'button:has([data-testid="ExpandMoreIcon"])',
      }),
      ...((hasCollapse || hasExpand) && {
        collapse: 'button:has([data-testid="ExpandLessIcon"])',
        expand: 'button:has([data-testid="ExpandMoreIcon"])',
      }),
    };

    return {
      node: {
        type: "section",
        kind: "dnd-item-section",
        path: '[data-testid="dnd-draggable-item"]',
        meta,
      },
      childContainers,
    };
  },
};
