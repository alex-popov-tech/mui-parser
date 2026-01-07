import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of autocomplete structure.
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

  // 3. Must contain .MuiAutocomplete-root
  const autocompleteRoot = $el.find(".MuiAutocomplete-root");
  if (autocompleteRoot.length !== 1) {
    return false;
  }

  // 4. MuiAutocomplete-root must be a <div>
  if (autocompleteRoot.prop("tagName")?.toLowerCase() !== "div") {
    return false;
  }

  // 5. Get field name: first try name attr, then label text, then placeholder
  const input = autocompleteRoot.find(".MuiAutocomplete-input");
  let fieldName = autocompleteRoot.attr("name")?.trim();
  if (!fieldName) {
    // Fallback: look for label element associated with autocomplete
    // Label's "for" attr matches the input's "id"
    const inputId = input.attr("id");
    if (inputId) {
      const label = $el.find(`label[for="${inputId}"]`);
      fieldName = label.text()?.trim();
    }
  }
  if (!fieldName) {
    // Fallback: use placeholder text
    fieldName = input.attr("placeholder")?.trim();
  }
  if (!fieldName) {
    return false;
  }

  // 6. Must contain input with MuiAutocomplete-input class
  if (input.length !== 1) {
    return false;
  }

  // 7. Input must have role="combobox"
  if (input.attr("role") !== "combobox") {
    return false;
  }

  // 8. Get input id for listbox connection
  const inputId = input.attr("id");
  if (!inputId || inputId.trim() === "") {
    return false;
  }

  return true;
}
