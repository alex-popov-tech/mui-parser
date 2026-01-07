import type { GatheredNode } from "../../types";

/**
 * Meta fields for aside section components.
 * Empty - this is a pure structural container.
 */
export type AsideSectionMeta = Record<string, never>;

/**
 * A detected aside section node with typed meta.
 */
export interface AsideSectionNode extends GatheredNode<AsideSectionMeta> {
  type: "section";
  kind: "aside-section";
  meta: AsideSectionMeta;
}
