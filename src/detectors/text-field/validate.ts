import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of text-field structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have data-testid="text-field"
  if ($el.attr("data-testid") !== "text-field") {
    return false;
  }

  // 3. Must have MuiTextField-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiTextField-root")) {
    return false;
  }

  // 4. Must contain .MuiInputBase-root div
  const inputBase = $el.find(".MuiInputBase-root");
  if (inputBase.length !== 1) {
    return false;
  }
  if (inputBase.prop("tagName")?.toLowerCase() !== "div") {
    return false;
  }

  // 5. Must contain input.MuiInputBase-input with text-like type
  // Accepts: text, url, email, tel, search
  const textLikeSelector =
    'input.MuiInputBase-input:is([type="text"], [type="url"], [type="email"], [type="tel"], [type="search"])';
  const input = inputBase.find(textLikeSelector);
  if (input.length !== 1) {
    return false;
  }

  // 6. Input must have non-empty name attribute
  const inputName = input.attr("name");
  if (!inputName || inputName.trim() === "") {
    return false;
  }

  return true;
}
