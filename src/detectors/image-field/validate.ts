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

  // 2. Must have class containing "ImageField_wrapper"
  const className = $el.attr("class") || "";
  if (!className.includes("ImageField_wrapper")) {
    return false;
  }

  // 3. Must contain a label with MuiInputLabel-root class
  const label = $el.find("label.MuiInputLabel-root");
  if (label.length !== 1) {
    return false;
  }

  // 4. Label must have non-empty text content
  const labelText = label.text().trim();
  if (!labelText) {
    return false;
  }

  // 5. Must contain file input with data-testid="file-input"
  const fileInput = $el.find('input[data-testid="file-input"]');
  if (fileInput.length !== 1) {
    return false;
  }

  // 6. File input must be type="file"
  if (fileInput.attr("type") !== "file") {
    return false;
  }

  // 7. Must contain upload button with data-testid="file-change-action"
  const uploadButton = $el.find('[data-testid="file-change-action"]');
  if (uploadButton.length !== 1) {
    return false;
  }

  return true;
}
