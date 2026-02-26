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

    const meta: ImageFieldMeta = {
      input: 'input[type="file"]',
      img: "img",
    };

    return {
      node: {
        type: "field",
        kind: "image-field",
        path: '[class^="ImageField"]',
        meta,
      },
      childContainers: [],
    };
  },
};
