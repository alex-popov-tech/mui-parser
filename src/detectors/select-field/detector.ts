import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { SelectFieldMeta } from "./types";
import { validate } from "./validate";

export const selectFieldDetector: Detector = {
  name: "select-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);
    const nativeInput = $el.find(
      '.MuiInputBase-root[data-testid="select-field"] .MuiSelect-nativeInput',
    );
    const inputName = nativeInput.attr("name") as string;

    const meta: SelectFieldMeta = {
      input: `input[name="${inputName}"]`,
      options: `#menu-${inputName} .MuiMenuItem-root`,
    };

    return {
      node: {
        type: "field",
        kind: "select-field",
        path: `[data-testid="select-field"]:has(input[name="${inputName}"])`,
        meta,
      },
      childContainers: [],
    };
  },
};
