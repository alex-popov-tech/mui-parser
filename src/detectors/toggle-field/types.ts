import type { GatheredNode } from "../../types";

/**
 * Meta fields for toggle/switch components.
 */
export interface ToggleFieldMeta {
  /**
   * Selector for checkbox input (relative to path).
   * State: Check parent .MuiSwitch-switchBase for .Mui-checked class (present = ON, absent = OFF)
   */
  input: string;
  /**
   * Selector for the label element (relative to path).
   * Optional: Only present when the HTML contains a label element.
   */
  label?: string;
}

/**
 * A detected toggle node with typed meta.
 */
export interface ToggleFieldNode extends GatheredNode<ToggleFieldMeta> {
  kind: "toggle-field";
  meta: ToggleFieldMeta;
}
