import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of form section structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <section> element
  if (el.tagName !== "section") {
    return false;
  }

  // 2. Must have class starting with "FormSection_wrapper__"
  const className = $el.attr("class") || "";
  if (!/FormSection_wrapper__/.test(className)) {
    return false;
  }

  // 3. Must contain exactly one <h2> with class starting with "FormSection_title__"
  const titleEl = $el.children('h2[class*="FormSection_title__"]');
  if (titleEl.length !== 1) {
    return false;
  }

  // 4. Title text must be non-empty
  const title = titleEl.text().trim();
  if (!title) {
    return false;
  }

  // 5. Must contain body wrapper with class starting with "FormSection_bodyWrapper__"
  const bodyWrapper = $el.children('div[class*="FormSection_bodyWrapper__"]');
  if (bodyWrapper.length !== 1) {
    return false;
  }

  // 6. Body wrapper must contain body with class starting with "FormSection_body__"
  const body = bodyWrapper.children('div[class*="FormSection_body__"]');
  if (body.length !== 1) {
    return false;
  }

  const bodyElement = body.get(0);
  if (!bodyElement) {
    return false;
  }

  return true;
}
