import type { Element } from "domhandler";

/**
 * Strict validation of aside section structure.
 * Returns true only if the element is an <aside> tag.
 */
export function validate(el: Element): boolean {
  return el.tagName === "aside";
}
