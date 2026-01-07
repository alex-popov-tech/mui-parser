import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { AsideSectionMeta } from "./types";
import { validate } from "./validate";

export const asideSectionDetector: Detector = {
  name: "aside-section",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el)) {
      return null;
    }

    const meta: AsideSectionMeta = {};
    const children = $(el).children().toArray() as Element[];

    return {
      node: {
        type: "section",
        kind: "aside-section",
        path: "aside",
        meta,
      },
      childContainers: children,
    };
  },
};
