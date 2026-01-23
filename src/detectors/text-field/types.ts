import type { GatheredNode } from "../../types";

/**
 * Supported text-like input types.
 */
export type TextLikeInputType = "text" | "url" | "email" | "tel" | "search";

/**
 * Meta fields for text-field components.
 */
export interface TextFieldMeta {
  /**
   * Selector for the text input element (relative to path).
   * Value: Read from the input's `value` attribute.
   */
  input: string;

  /**
   * The HTML input type (text, url, email, tel, search).
   */
  inputType: TextLikeInputType;

  /**
   * The field's label text.
   * Optional: Only present when the HTML contains a label element.
   */
  label?: string;
}

/**
 * A detected text-field node with typed meta.
 */
export interface TextFieldNode extends GatheredNode<TextFieldMeta> {
  kind: "text-field";
  meta: TextFieldMeta;
}
