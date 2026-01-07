import type { GatheredNode } from "../../types";

/**
 * Meta fields for text-field components.
 */
export interface TextFieldMeta {
  /**
   * Selector for the text input element (relative to path).
   * Value: Read from the input's `value` attribute.
   */
  input: string;
}

/**
 * A detected text-field node with typed meta.
 */
export interface TextFieldNode extends GatheredNode<TextFieldMeta> {
  kind: "text-field";
  meta: TextFieldMeta;
}
