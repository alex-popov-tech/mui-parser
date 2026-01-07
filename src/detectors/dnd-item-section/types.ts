import type { GatheredNode } from "../../types";

/**
 * Meta fields for DnD item section components.
 */
export interface DndItemSectionMeta {
  /**
   * Selector for item title/heading in header (relative to item path).
   * Always present and required.
   */
  title: string;
  /**
   * Selector for item body/content container (relative to item path).
   */
  body: string;
  /**
   * Selector for enabled toggle switch in header (relative to item path).
   * Optional - only present if item has an enabled switch.
   */
  enabled?: string;
  /**
   * Selector for remove/close button (relative to item path).
   * Optional - only present if item has a remove button.
   */
  remove?: string;
  /**
   * Selector for expand button - shown when item is collapsed (relative to item path).
   * Optional - only present if item has expand/collapse functionality.
   */
  expand?: string;
  /**
   * Selector for collapse button - shown when item is expanded (relative to item path).
   * Optional - only present if item has expand/collapse functionality.
   */
  collapse?: string;
}

/**
 * A detected DnD item section node with typed meta.
 */
export interface DndItemSectionNode extends GatheredNode<DndItemSectionMeta> {
  type: "section";
  kind: "dnd-item-section";
  meta: DndItemSectionMeta;
}
