import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { TextFieldMeta, TextLikeInputType } from "./types";
import { validate } from "./validate";

interface NameAnalysis {
  baseName: string;
  useExactMatch: boolean;
}

/**
 * Analyzes input name to determine base name and matching strategy.
 * - Simple names (no dots): use exact match (=)
 * - Names with dots (localized or array-indexed): use prefix match (^=)
 *
 * Examples:
 * - "groupTitle" → { baseName: "groupTitle", useExactMatch: true }
 * - "localisedName.values.en" → { baseName: "localisedName", useExactMatch: false }
 * - "items.0.title" → { baseName: "items", useExactMatch: false }
 */
function analyzeInputName(fullName: string): NameAnalysis {
  const dotIndex = fullName.indexOf(".");
  if (dotIndex !== -1) {
    return {
      baseName: fullName.substring(0, dotIndex),
      useExactMatch: false,
    };
  }
  return {
    baseName: fullName,
    useExactMatch: true,
  };
}

/**
 * Extracts label text from the label element, excluding the asterisk span.
 */
function extractLabelText(
  $el: ReturnType<CheerioAPI>,
  $: CheerioAPI,
): string | undefined {
  const label = $el.find("label.MuiInputLabel-root");
  if (label.length === 0) {
    return undefined;
  }
  // Clone the label, remove the asterisk span, and get the text
  const labelClone = label.clone();
  labelClone.find(".MuiInputLabel-asterisk").remove();
  const text = labelClone.text().trim();
  return text || undefined;
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
    const { baseName, useExactMatch } = analyzeInputName(inputName);

    // Build selector with appropriate matching strategy
    const operator = useExactMatch ? "=" : "^=";
    const inputSelector = `input[name${operator}"${baseName}"]`;

    const meta: TextFieldMeta = {
      input: inputSelector,
      inputType,
    };

    // Extract label text if present
    const labelText = extractLabelText($el, $);
    if (labelText) {
      meta.label = labelText;
    }

    return {
      node: {
        type: "field",
        kind: "text-field",
        path: `[data-testid="text-field"]:has(${inputSelector})`,
        meta,
      },
      childContainers: [],
    };
  },
};
