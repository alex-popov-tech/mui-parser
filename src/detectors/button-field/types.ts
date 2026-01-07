import type { GatheredNode } from "../../types";

/**
 * Meta fields for button components.
 */
export interface ButtonFieldMeta {
  /**
   * The button's text label.
   * Used to identify the button for interaction.
   */
  label: string;
}

/**
 * A detected button node with typed meta.
 */
export interface ButtonFieldNode extends GatheredNode<ButtonFieldMeta> {
  kind: "button-field";
  meta: ButtonFieldMeta;
}
