import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { AutocompleteFieldMeta } from "./types";
import { validate } from "./validate";

/**
 * Escapes special characters in text for use in Playwright text selectors.
 */
function escapeTextForSelector(text: string): string {
  return text.replace(/"/g, '\\"');
}

export const autocompleteFieldDetector: Detector = {
  name: "autocomplete-field",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);
    const autocompleteRoot = $el.find(".MuiAutocomplete-root");
    const input = autocompleteRoot.find(".MuiAutocomplete-input");
    const inputId = input.attr("id") as string;

    let fieldName = autocompleteRoot.attr("name")?.trim();
    const hasNameAttr = Boolean(fieldName);
    if (!fieldName) {
      const label = $el.find(`label[for="${inputId}"]`);
      fieldName = label.text()?.trim();
    }
    const hasLabelText = !hasNameAttr && Boolean(fieldName);
    if (!fieldName) {
      fieldName = input.attr("placeholder")?.trim() as string;
    }

    const escapedFieldName = escapeTextForSelector(fieldName);

    // Build path based on how fieldName was determined
    let path: string;
    if (hasNameAttr) {
      path = `.MuiAutocomplete-root[name="${escapedFieldName}"]`;
    } else if (hasLabelText) {
      path = `.MuiAutocomplete-root:has(label:text-is("${escapedFieldName}"))`;
    } else {
      // placeholder fallback
      path = `.MuiAutocomplete-root:has(input[placeholder="${escapedFieldName}"])`;
    }

    const meta: AutocompleteFieldMeta = {
      input: ".MuiAutocomplete-input",
      clearIndicator: ".MuiAutocomplete-clearIndicator",
      options: '[role="presentation"] [role="option"]',
      values: '[data-testid="autocomplete-chip"]',
    };

    return {
      node: {
        type: "field",
        kind: "autocomplete-field",
        path,
        meta,
      },
      childContainers: [],
    };
  },
};
