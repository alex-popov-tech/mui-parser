import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of button structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <button> element
  if (el.tagName !== "button") {
    return false;
  }

  // 2. Must have MuiButton-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiButton-root")) {
    return false;
  }

  // 3. Must have non-empty text content (excluding icons and ripple)
  const label = getButtonLabel($el, $);
  if (!label || label.trim() === "") {
    return false;
  }

  return true;
}

/**
 * Extract button label text, excluding icon spans and ripple.
 */
export function getButtonLabel(
  $el: ReturnType<CheerioAPI>,
  $: CheerioAPI,
): string {
  // Clone to avoid modifying original
  const $clone = $el.clone();

  // Remove icon and ripple spans
  $clone.find(".MuiButton-startIcon, .MuiButton-endIcon").remove();
  $clone.find(".MuiTouchRipple-root").remove();

  return $clone.text().trim();
}
