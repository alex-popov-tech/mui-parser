import type { Element } from "domhandler";

/**
 * Strict validation of main section structure.
 * Returns true only if the element is a <main> tag.
 */
export function validate(el: Element): boolean {
  return el.tagName === "main";
}
