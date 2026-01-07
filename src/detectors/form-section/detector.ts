import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { FormSectionMeta } from "./types";
import { validate } from "./validate";

/**
 * Escapes special characters in title text for use in Playwright text selectors.
 */
function escapeTitleForSelector(text: string): string {
  return text.replace(/"/g, '\\"');
}

export const formSectionDetector: Detector = {
  name: "form-section",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);
    const titleEl = $el.children('h2[class*="FormSection_title__"]');
    const title = titleEl.text().trim();

    const bodyWrapper = $el.children('div[class*="FormSection_bodyWrapper__"]');
    const bodyElement = bodyWrapper
      .children('div[class*="FormSection_body__"]')
      .get(0) as Element;

    const escapedTitle = escapeTitleForSelector(title);

    const meta: FormSectionMeta = {
      title: 'h2[class*="FormSection_title__"]',
      body: 'div[class*="FormSection_body__"]',
      fields: '[data-testid="form-field-wrapper"]',
    };

    return {
      node: {
        type: "section",
        kind: "form-section",
        path: `section[class*="FormSection_wrapper__"]:has(h2:text-is("${escapedTitle}"))`,
        meta,
      },
      childContainers: [bodyElement],
    };
  },
};
