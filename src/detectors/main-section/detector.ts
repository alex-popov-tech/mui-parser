import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { MainSectionMeta } from "./types";
import { validate } from "./validate";

export const mainSectionDetector: Detector = {
  name: "main-section",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el)) {
      return null;
    }

    const meta: MainSectionMeta = {};
    const children = $(el).children().toArray() as Element[];

    return {
      node: {
        type: "section",
        kind: "main-section",
        path: "main",
        meta,
      },
      childContainers: children,
    };
  },
};
