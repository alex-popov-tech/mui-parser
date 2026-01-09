import type { GatheredNode } from "../../types";

/**
 * Toggle button group selector pair.
 */
export interface ToggleButtonGroupSelectors {
  /** Selector for all buttons in the group (relative to path). */
  buttons: string;
  /** Selector for the selected button (relative to path). */
  selected: string;
}

/**
 * Meta fields for CTA button link composite components.
 * This component wraps multiple child controls parsed as a single unit.
 */
export interface CtaButtonLinkMeta {
  /**
   * Selector for the enabled toggle input in the card header (relative to path).
   * State: Check parent .MuiSwitch-switchBase for .Mui-checked class.
   */
  enabled: string;

  /**
   * Selector for expand button (optional, shown when collapsed).
   */
  expand?: string;

  /**
   * Selector for collapse button (optional, shown when expanded).
   */
  collapse?: string;

  /**
   * Nested field selectors.
   */
  fields: {
    /**
     * Call To Action Link dropdown (required).
     */
    callToAction: {
      /** Selector for select field trigger (relative to path). */
      input: string;
      /** Selector for dropdown option items (absolute, portaled to document root). */
      options: string;
    };

    /**
     * URL / Email Address / Phone Number text field (conditional).
     * Selector for text input (relative to path).
     */
    customUrl: string;

    /**
     * CTA Button Text field (conditional).
     * Selector for text input (relative to path).
     */
    customText: string;

    /**
     * Style toggle button group (STYLE_1-4).
     */
    style: ToggleButtonGroupSelectors;

    /**
     * Size toggle button group (SMALL, MEDIUM, LARGE).
     */
    size: ToggleButtonGroupSelectors;

    /**
     * Variant toggle button group (TEXT, CONTAINED, OUTLINED).
     */
    variant: ToggleButtonGroupSelectors;

    /**
     * Open in new tab toggle.
     * Selector for checkbox input (relative to path).
     */
    openInNewTabEnabled: string;
  };
}

/**
 * A detected CTA button link node with typed meta.
 */
export interface CtaButtonLinkNode extends GatheredNode<CtaButtonLinkMeta> {
  kind: "cta-button-link";
  meta: CtaButtonLinkMeta;
}
