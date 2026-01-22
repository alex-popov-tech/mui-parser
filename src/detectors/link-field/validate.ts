import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of link structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be an anchor element
  if (el.tagName !== "a") {
    return false;
  }

  // 2. Must have a data-testid
  const testId = $el.attr("data-testid");
  if (!testId || testId.trim() === "") {
    return false;
  }

  // 3. Must have MuiButton-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiButton-root")) {
    return false;
  }

  // 4. Must have a valid href
  const href = $el.attr("href");
  if (!href || href.trim() === "") {
    return false;
  }

  // 5. Must have non-empty text content (excluding icons and ripple)
  const label = getLinkLabel($el, $);
  if (!label) {
    return false;
  }

  return true;
}

/**
 * Extract link label text, excluding icons and ripple.
 */
export function getLinkLabel(
  $el: ReturnType<CheerioAPI>,
  $: CheerioAPI,
): string {
  // Clone to avoid modifying original
  const $clone = $el.clone();

  $clone.find(".MuiButton-startIcon, .MuiButton-endIcon").remove();
  $clone.find(".MuiTouchRipple-root").remove();

  return $clone.text().trim();
}
