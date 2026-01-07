import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { ImageFieldMeta } from "./types";
import { validate } from "./validate";

export const imageFieldDetector: Detector = {
  name: "image-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    // Extract label text (validation already confirmed it exists and is non-empty)
    const $el = $(el);
    const label = $el.find("label.MuiInputLabel-root");
    const labelText = label.text().trim();

    const meta: ImageFieldMeta = {
      label: "label.MuiInputLabel-root",
      preview: 'img[class*="ImagePreview_previewImage"]',
      fileInput: 'input[data-testid="file-input"]',
      uploadButton: '[data-testid="file-change-action"]',
      removeButton: '[data-testid="file-remove-action"]',
    };

    return {
      node: {
        type: "field",
        kind: "image-field",
        path: `div[class*="ImageField_wrapper"]:has-text("${labelText}")`,
        meta,
      },
      childContainers: [],
    };
  },
};
