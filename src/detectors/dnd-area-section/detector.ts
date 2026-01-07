import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import { validate } from "./validate";

export const dndAreaSectionDetector: Detector = {
  name: "dnd-area-section",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    const $el = $(el);

    // Return all draggable items as child containers for recursive parsing
    const childContainers = $el
      .children('[data-testid="dnd-draggable-item"]')
      .toArray() as Element[];

    return {
      node: {
        type: "section",
        kind: "dnd-area-section",
        path: '[data-testid="dnd-droppable-area"]',
      },
      childContainers,
    };
  },
};
