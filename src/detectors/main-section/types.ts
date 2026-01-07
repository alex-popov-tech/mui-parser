import type { GatheredNode } from "../../types";

/**
 * Meta fields for main section components.
 * Empty - this is a pure structural container.
 */
export type MainSectionMeta = Record<string, never>;

/**
 * A detected main section node with typed meta.
 */
export interface MainSectionNode extends GatheredNode<MainSectionMeta> {
  type: "section";
  kind: "main-section";
  meta: MainSectionMeta;
}
