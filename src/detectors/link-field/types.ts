import type { GatheredNode } from "../../types";

/**
 * Meta fields for link components.
 */
export interface LinkFieldMeta {
  /**
   * The link label text.
   */
  label: string;
}

/**
 * A detected link node with typed meta.
 */
export interface LinkFieldNode extends GatheredNode<LinkFieldMeta> {
  kind: "link-field";
  meta: LinkFieldMeta;
}
