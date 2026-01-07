import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of select-field structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have MuiFormControl-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiFormControl-root")) {
    return false;
  }

  // 3. Must have direct child .MuiInputBase-root with data-testid="select-field"
  const inputBase = $el.children(
    '.MuiInputBase-root[data-testid="select-field"]',
  );
  if (inputBase.length !== 1) {
    return false;
  }

  // 4. InputBase must be a <div>
  if (inputBase.prop("tagName")?.toLowerCase() !== "div") {
    return false;
  }

  // 5. Must contain exactly one .MuiSelect-select element (the trigger)
  const selectTrigger = inputBase.find(".MuiSelect-select");
  if (selectTrigger.length !== 1) {
    return false;
  }

  // 6. Must contain exactly one .MuiSelect-nativeInput (hidden input)
  const nativeInput = inputBase.find(".MuiSelect-nativeInput");
  if (nativeInput.length !== 1) {
    return false;
  }

  // 7. Hidden input must be an <input> element
  if (nativeInput.prop("tagName")?.toLowerCase() !== "input") {
    return false;
  }

  // 8. Input must have non-empty name attribute
  const inputName = nativeInput.attr("name");
  if (!inputName || inputName.trim() === "") {
    return false;
  }

  return true;
}
