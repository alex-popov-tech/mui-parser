import type { GatheredNode } from "../../types";

/**
 * Meta fields for image-field components.
 */
export interface ImageFieldMeta {
  /**
   * Selector for the hidden file input (relative to path).
   * Used for uploading files programmatically.
   */
  input: string;

  /**
   * Selector for the preview image element (relative to path).
   * Used to assert upload completion (image becomes visible after upload).
   */
  img: string;
}

/**
 * A detected image-field node with typed meta.
 */
export interface ImageFieldNode extends GatheredNode<ImageFieldMeta> {
  kind: "image-field";
  meta: ImageFieldMeta;
}
