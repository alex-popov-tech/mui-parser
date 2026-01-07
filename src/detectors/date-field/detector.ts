import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { DateFieldMeta } from "./types";
import { validate } from "./validate";

/**
 * Extracts the base name from input name.
 * Handles localized names like "localisedName.values.en" -> "localisedName"
 */
function extractBaseName(fullName: string): string {
  const valuesIndex = fullName.indexOf(".values.");
  if (valuesIndex !== -1) {
    return fullName.substring(0, valuesIndex);
  }
  return fullName;
}

export const dateFieldDetector: Detector = {
  name: "date-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    // Extract input name (validation already confirmed it exists)
    const $el = $(el);
    const input = $el.find(
      'input.MuiInputBase-input[data-testid="date-field"][type="tel"]'
    );
    const inputName = input.attr("name") as string;
    const inputBaseName = extractBaseName(inputName);

    const meta: DateFieldMeta = {
      input: `input[name^="${inputBaseName}"]`,
    };

    return {
      node: {
        type: "field",
        kind: "date-field",
        path: `.MuiTextField-root:has(input[data-testid="date-field"][name^="${inputBaseName}"])`,
        meta,
      },
      childContainers: [],
    };
  },
};
