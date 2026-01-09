import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { TextEditorFieldMeta } from "./types";
import { validate } from "./validate";

/**
 * Escapes special characters in label text for use in CSS attribute selectors.
 */
function escapeLabelForSelector(text: string): string {
  return text.replace(/"/g, '\\"');
}

export const textEditorFieldDetector: Detector = {
  name: "text-editor-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);
    const label = $el.find("label.MuiFormLabel-root");
    const labelText = label.text().trim();

    const meta: TextEditorFieldMeta = {
      editor: 'div.fr-element.fr-view[contenteditable="true"]',
      helperText: "p.MuiFormHelperText-root",
    };

    // Only include label selector when label exists
    if (labelText) {
      meta.label = "label.MuiFormLabel-root";
    }

    // Use label-based path when label exists, simple path otherwise
    const path = labelText
      ? `[data-testid="text-editor-field"]:has(label:has-text("${escapeLabelForSelector(labelText)}"))`
      : '[data-testid="text-editor-field"]';

    return {
      node: {
        type: "field",
        kind: "text-editor-field",
        path,
        meta,
      },
      childContainers: [],
    };
  },
};
