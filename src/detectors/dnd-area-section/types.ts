import type { GatheredNode } from "../../types";

/**
 * DnD area section has no meta - it's purely structural.
 */
export type DndAreaSectionMeta = undefined;

/**
 * A detected DnD area section node.
 */
export interface DndAreaSectionNode extends GatheredNode<DndAreaSectionMeta> {
  type: "section";
  kind: "dnd-area-section";
}
