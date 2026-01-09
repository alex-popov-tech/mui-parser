import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of text-editor-field structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have data-testid="text-editor-field"
  if ($el.attr("data-testid") !== "text-editor-field") {
    return false;
  }

  // 3. Must have MuiFormControl-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiFormControl-root")) {
    return false;
  }

  // 4. Must contain div[data-testid="text-editor"] with fr-custom class
  const textEditorWrapper = $el.find(
    'div[data-testid="text-editor"].fr-custom',
  );
  if (textEditorWrapper.length !== 1) {
    return false;
  }

  // 5. Must contain div.fr-box (Froala editor container)
  const froalaBox = textEditorWrapper.find("div.fr-box");
  if (froalaBox.length !== 1) {
    return false;
  }

  // 6. Must contain contenteditable div.fr-element.fr-view
  const editor = froalaBox.find(
    'div.fr-element.fr-view[contenteditable="true"]',
  );
  if (editor.length !== 1) {
    return false;
  }

  return true;
}
