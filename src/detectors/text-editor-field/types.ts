import type { GatheredNode } from "../../types";

/**
 * Meta fields for text-editor-field components.
 */
export interface TextEditorFieldMeta {
  /**
   * Selector for the label element (relative to path).
   * Value: Read the text content to get field name.
   * Optional: Only present when the HTML contains a label element.
   */
  label?: string;

  /**
   * Selector for the contenteditable editor element (relative to path).
   * Value: Read innerHTML for content, use 'type' action to write.
   */
  editor: string;

  /**
   * Selector for the helper text element (relative to path).
   * Value: Read text content for validation messages.
   */
  helperText: string;
}

/**
 * A detected text-editor-field node with typed meta.
 */
export interface TextEditorFieldNode extends GatheredNode<TextEditorFieldMeta> {
  kind: "text-editor-field";
  meta: TextEditorFieldMeta;
}
