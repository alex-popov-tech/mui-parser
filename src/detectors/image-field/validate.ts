import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of image-field structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have class starting with "ImageField"
  const className = $el.attr("class") || "";
  if (!/ImageField/.test(className)) {
    return false;
  }

  // 3. Must contain a file input
  const fileInput = $el.find('input[type="file"]');
  if (fileInput.length !== 1) {
    return false;
  }

  return true;
}
