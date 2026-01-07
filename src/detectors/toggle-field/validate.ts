import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of toggle structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <label> element
  if (el.tagName !== "label") {
    return false;
  }

  // 2. Must have data-testid="toggle-field"
  if ($el.attr("data-testid") !== "toggle-field") {
    return false;
  }

  // 3. Must have MuiFormControlLabel-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiFormControlLabel-root")) {
    return false;
  }

  // 4. Must contain exactly one .MuiSwitch-root span
  const switchRoot = $el.find(".MuiSwitch-root");
  if (switchRoot.length !== 1) {
    return false;
  }
  if (switchRoot.prop("tagName")?.toLowerCase() !== "span") {
    return false;
  }

  // 5. .MuiSwitch-root must contain exactly one .MuiSwitch-switchBase span
  const switchBase = switchRoot.find(".MuiSwitch-switchBase");
  if (switchBase.length !== 1) {
    return false;
  }
  if (switchBase.prop("tagName")?.toLowerCase() !== "span") {
    return false;
  }

  // 6. .MuiSwitch-switchBase must contain exactly one input[type="checkbox"]
  const input = switchBase.find('input[type="checkbox"]');
  if (input.length !== 1) {
    return false;
  }

  // 7. Input must have non-empty name attribute
  const inputName = input.attr("name");
  if (!inputName || inputName.trim() === "") {
    return false;
  }

  // 8. Must contain exactly one .MuiFormControlLabel-label span
  const labelSpan = $el.find(".MuiFormControlLabel-label");
  if (labelSpan.length !== 1) {
    return false;
  }
  if (labelSpan.prop("tagName")?.toLowerCase() !== "span") {
    return false;
  }

  return true;
}
