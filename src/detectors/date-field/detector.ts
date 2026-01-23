import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { DateFieldMeta } from "./types";
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
 * - "eventDate" → { baseName: "eventDate", useExactMatch: true }
 * - "localisedDate.values.en" → { baseName: "localisedDate", useExactMatch: false }
 * - "items.0.startDate" → { baseName: "items", useExactMatch: false }
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

export const dateFieldDetector: Detector = {
  name: "date-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) {
      return null;
    }

    // Extract input name (validation already confirmed it exists)
    const $el = $(el);
    const input = $el.find(
      'input.MuiInputBase-input[data-testid="date-field"][type="tel"]',
    );
    const inputName = input.attr("name") as string;
    const { baseName, useExactMatch } = analyzeInputName(inputName);

    // Build selector with appropriate matching strategy
    const operator = useExactMatch ? "=" : "^=";
    const inputSelector = `input[name${operator}"${baseName}"]`;

    const meta: DateFieldMeta = {
      input: inputSelector,
    };

    // Extract label text if present
    const labelText = extractLabelText($el, $);
    if (labelText) {
      meta.label = labelText;
    }

    return {
      node: {
        type: "field",
        kind: "date-field",
        path: `.MuiTextField-root:has(input[data-testid="date-field"][name${operator}"${baseName}"])`,
        meta,
      },
      childContainers: [],
    };
  },
};
