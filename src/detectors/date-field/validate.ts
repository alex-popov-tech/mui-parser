import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of date-field structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have MuiTextField-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiTextField-root")) {
    return false;
  }

  // 3. Must contain .MuiInputBase-root div
  const inputBase = $el.find(".MuiInputBase-root");
  if (inputBase.length !== 1) {
    return false;
  }
  if (inputBase.prop("tagName")?.toLowerCase() !== "div") {
    return false;
  }

  // 4. Must contain input with data-testid="date-field" and type="tel"
  const input = inputBase.find(
    'input.MuiInputBase-input[data-testid="date-field"][type="tel"]',
  );
  if (input.length !== 1) {
    return false;
  }

  // 5. Input must have non-empty name attribute
  const inputName = input.attr("name");
  if (!inputName || inputName.trim() === "") {
    return false;
  }

  return true;
}
