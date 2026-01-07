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
}

/**
 * A detected toggle node with typed meta.
 */
export interface ToggleFieldNode extends GatheredNode<ToggleFieldMeta> {
  kind: "toggle-field";
  meta: ToggleFieldMeta;
}
