import type { GatheredNode } from "../../types";

/**
 * Meta fields for select-field components.
 */
export interface SelectFieldMeta {
  /**
   * Selector for hidden input (relative to path).
   * State: Read `value` attribute for current selection.
   */
  input: string;
  /**
   * Selector for dropdown option items (absolute, at document root).
   * Pattern: `#menu-{fieldName} .MuiMenuItem-root` where fieldName is from input[name].
   * Each option has `data-value` attribute with the actual value.
   */
  options: string;
}

/**
 * A detected select-field node with typed meta.
 */
export interface SelectFieldNode extends GatheredNode<SelectFieldMeta> {
  kind: "select-field";
  meta: SelectFieldMeta;
}
