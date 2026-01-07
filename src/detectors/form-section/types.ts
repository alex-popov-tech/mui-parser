import type { GatheredNode } from "../../types";

/**
 * Meta fields for form section components.
 */
export interface FormSectionMeta {
  /**
   * Selector for the section title heading (relative to path).
   */
  title: string;
  /**
   * Selector for the section body container (relative to path).
   */
  body: string;
  /**
   * Selector for form field wrappers within the section (relative to path).
   */
  fields: string;
}

/**
 * A detected form section node with typed meta.
 */
export interface FormSectionNode extends GatheredNode<FormSectionMeta> {
  type: "section";
  kind: "form-section";
  meta: FormSectionMeta;
}
