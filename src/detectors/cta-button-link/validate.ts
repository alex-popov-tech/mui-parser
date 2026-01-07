import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Strict validation of CTA button link structure.
 * Returns true only if ALL structural checks pass.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have MuiPaper-root class
  const className = $el.attr("class") || "";
  if (!className.includes("MuiPaper-root")) {
    return false;
  }

  // 3. Must have class containing Card_wrapper__
  if (!/Card_wrapper__/.test(className)) {
    return false;
  }

  // 4. Must contain a heading span with text "CTA Button Link"
  const heading = $el.find('[class*="Card_heading__"]');
  if (heading.length !== 1) {
    return false;
  }
  if (heading.text().trim() !== "CTA Button Link") {
    return false;
  }

  // 5. Must contain the enabled toggle in header
  const enabledToggle = $el.find(
    '[class*="Card_header__"] input[type="checkbox"]',
  );
  if (enabledToggle.length < 1) {
    return false;
  }

  // 6. Must contain Call To Action Link select (required)
  const selectField = $el.find('[data-testid="select-field"]');
  if (selectField.length < 1) {
    return false;
  }

  // 7. Must contain style toggle button group
  const styleGroup = $el.find('[role="group"][name$="colorStyle"]');
  if (styleGroup.length !== 1) {
    return false;
  }

  // 8. Must contain size toggle button group
  const sizeGroup = $el.find('[role="group"][name$="size"]');
  if (sizeGroup.length !== 1) {
    return false;
  }

  // 9. Must contain variant toggle button group
  const variantGroup = $el.find('[role="group"][name$="variant"]');
  if (variantGroup.length !== 1) {
    return false;
  }

  // 10. Must contain openInNewTabEnabled toggle in body
  const openInNewTabToggle = $el.find(
    '[class*="Card_body__"] input[name$="openInNewTabEnabled"]',
  );
  if (openInNewTabToggle.length !== 1) {
    return false;
  }

  return true;
}
