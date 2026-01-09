import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { TextFieldMeta, TextLikeInputType } from "./types";
import { validate } from "./validate";

/**
 * Extracts the base name from input name.
 * Handles localized names like "localisedName.values.en" → "localisedName"
 */
function extractBaseName(fullName: string): string {
  const valuesIndex = fullName.indexOf(".values.");
  if (valuesIndex !== -1) {
    return fullName.substring(0, valuesIndex);
  }
  return fullName;
}

// Selector for text-like input types
const TEXT_LIKE_SELECTOR =
  'input.MuiInputBase-input:is([type="text"], [type="url"], [type="email"], [type="tel"], [type="search"])';

export const textFieldDetector: Detector = {
  name: "text-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    // Extract input name and type (validation already confirmed it exists)
    const $el = $(el);
    const input = $el.find(TEXT_LIKE_SELECTOR);
    const inputName = input.attr("name") as string;
    const inputType = (input.attr("type") as TextLikeInputType) || "text";
    const inputBaseName = extractBaseName(inputName);

    const meta: TextFieldMeta = {
      input: `input[name^="${inputBaseName}"]`,
      inputType,
    };

    return {
      node: {
        type: "field",
        kind: "text-field",
        path: `[data-testid="text-field"]:has(input[name^="${inputBaseName}"])`,
        meta,
      },
      childContainers: [],
    };
  },
};
