import type { GatheredNode } from "../../types";

/**
 * Meta fields for date-field components.
 */
export interface DateFieldMeta {
  /**
   * Selector for the date input element (relative to path).
   * Value: Read from the input's `value` attribute.
   */
  input: string;

  /**
   * The field's label text.
   * Optional: Only present when the HTML contains a label element.
   */
  label?: string;
}

/**
 * A detected date-field node with typed meta.
 */
export interface DateFieldNode extends GatheredNode<DateFieldMeta> {
  kind: "date-field";
  meta: DateFieldMeta;
}
