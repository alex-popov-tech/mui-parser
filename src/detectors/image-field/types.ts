import type { GatheredNode } from "../../types";

/**
 * Meta fields for image-field components.
 */
export interface ImageFieldMeta {
  /**
   * Selector for the label element (relative to path).
   * Value: Read from text content to get field name.
   */
  label: string;

  /**
   * Selector for the preview image element (relative to path).
   * Value: Read from `src` attribute. Element only exists when image is uploaded.
   */
  preview: string;

  /**
   * Selector for the hidden file input (relative to path).
   * Used for uploading files programmatically.
   */
  fileInput: string;

  /**
   * Selector for the upload/change button (relative to path).
   * Text is "Choose file" when no image, "Change file" when image exists.
   */
  uploadButton: string;

  /**
   * Selector for the remove button (relative to path).
   * Only exists when an image is uploaded.
   */
  removeButton: string;
}

/**
 * A detected image-field node with typed meta.
 */
export interface ImageFieldNode extends GatheredNode<ImageFieldMeta> {
  kind: "image-field";
  meta: ImageFieldMeta;
}
