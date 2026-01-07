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
    const escapedLabel = escapeLabelForSelector(labelText);

    const meta: TextEditorFieldMeta = {
      label: "label.MuiFormLabel-root",
      editor: 'div.fr-element.fr-view[contenteditable="true"]',
      helperText: "p.MuiFormHelperText-root",
    };

    return {
      node: {
        type: "field",
        kind: "text-editor-field",
        path: `[data-testid="text-editor-field"]:has(label:text-is("${escapedLabel}"))`,
        meta,
      },
      childContainers: [],
    };
  },
};
