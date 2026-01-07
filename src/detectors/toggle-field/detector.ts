import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { ToggleFieldMeta } from "./types";
import { validate } from "./validate";

export const toggleFieldDetector: Detector = {
  name: "toggle-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);
    const input = $el.find('.MuiSwitch-switchBase input[type="checkbox"]');
    const inputName = input.attr("name") as string;

    const meta: ToggleFieldMeta = {
      input: `input[name="${inputName}"]`,
    };

    return {
      node: {
        type: "field",
        kind: "toggle-field",
        path: `[data-testid="toggle-field"]:has(input[name="${inputName}"])`,
        meta,
      },
      childContainers: [],
    };
  },
};
