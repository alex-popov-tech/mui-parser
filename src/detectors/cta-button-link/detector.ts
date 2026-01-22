import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import type { DetectionResult, Detector } from "../../types";
import type { CtaButtonLinkMeta } from "./types";
import { validate } from "./validate";

export const ctaButtonLinkDetector: Detector = {
  name: "cta-button-link",

  detect(el: Element, $: CheerioAPI): DetectionResult | null {
    if (!validate(el, $)) return null;

    const $el = $(el);

    // Check for optional expand/collapse buttons in header
    const header = $el.find('[class*="Card_header__"]');
    const hasExpand = header.find('[data-testid="ExpandMoreIcon"]').length > 0;
    const hasCollapse =
      header.find('[data-testid="ExpandLessIcon"]').length > 0;

    const meta: CtaButtonLinkMeta = {
      enabled: 'input[name$="enabled"]',
      ...(hasExpand && {
        expand: 'button:has([data-testid="ExpandMoreIcon"])',
      }),
      ...(hasCollapse && {
        collapse: 'button:has([data-testid="ExpandLessIcon"])',
      }),
      fields: {
        callToAction: {
          input: '[data-testid="select-field"]:has(input[name$="selectType"])',
          // Options are portaled to document root in a MuiMenu with id="menu-{inputName}"
          options: '[role="presentation"][id$="selectType"] [role="option"]',
        },
        customUrl: 'input[name$="customUrl"]',
        customText: 'input[name$="customText"]',
        style: {
          buttons: '[role="group"][name$="colorStyle"] button',
          selected:
            '[role="group"][name$="colorStyle"] button[aria-pressed="true"]',
        },
        size: {
          buttons: '[role="group"][name$="size"] button',
          selected: '[role="group"][name$="size"] button[aria-pressed="true"]',
        },
        variant: {
          buttons: '[role="group"][name$="variant"] button',
          selected:
            '[role="group"][name$="variant"] button[aria-pressed="true"]',
        },
        openInNewTabEnabled: 'input[name$="openInNewTabEnabled"]',
      },
    };

    return {
      node: {
        type: "field",
        kind: "cta-button-link",
        path: 'div.MuiPaper-root[class*="Card_wrapper__"]:has(span:text-is("CTA Button Link"))',
        meta,
      },
      childContainers: [],
    };
  },
};
