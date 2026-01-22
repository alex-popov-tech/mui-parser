import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { LinkFieldMeta } from "./types";
import { getLinkLabel, validate } from "./validate";

export const linkFieldDetector: Detector = {
  name: "link-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    const $el = $(el);
    const label = getLinkLabel($el, $);
    const testId = $el.attr("data-testid") as string;
    const escapedTestId = testId.replace(/"/g, '\\"');

    const meta: LinkFieldMeta = {
      label,
    };

    return {
      node: {
        type: "field",
        kind: "link-field",
        path: `a.MuiButton-root[data-testid="${escapedTestId}"]`,
        meta,
      },
      childContainers: [],
    };
  },
};
