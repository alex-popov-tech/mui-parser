import type { GatheredNode } from "../../types";

/**
 * Meta fields for autocomplete components.
 */
export interface AutocompleteFieldMeta {
  /**
   * Selector for the input element (relative to path).
   * Used for: typing to filter options, reading current input text.
   */
  input: string;
  /**
   * Selector for clear indicator button (relative to path).
   * Used for: clearing the selection (only present when value exists).
   */
  clearIndicator: string;
  /**
   * Selector for listbox options (absolute, in portal).
   * Uses role-based selector for accessibility elements.
   */
  options: string;
  /**
   * Selector for selected value chips (for multi-select autocomplete).
   * Locates chips within the autocomplete, not the actual values.
   */
  values: string;
}

/**
 * A detected autocomplete node with typed meta.
 */
export interface AutocompleteFieldNode extends GatheredNode<AutocompleteFieldMeta> {
  kind: "autocomplete-field";
  meta: AutocompleteFieldMeta;
}
