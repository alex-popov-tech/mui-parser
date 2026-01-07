import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { ButtonFieldMeta } from "./types";
import { getButtonLabel, validate } from "./validate";

export const buttonFieldDetector: Detector = {
  name: "button-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    const $el = $(el);
    const label = getButtonLabel($el, $);

    const meta: ButtonFieldMeta = {
      label,
    };

    // Use label in selector to uniquely identify the button
    // Escape quotes in label for CSS selector
    const escapedLabel = label.replace(/"/g, '\\"');

    return {
      node: {
        type: "field",
        kind: "button-field",
        path: `button.MuiButton-root:text("${escapedLabel}")`,
        meta,
      },
      childContainers: [],
    };
  },
};
