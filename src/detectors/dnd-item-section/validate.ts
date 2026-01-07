import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Validates DnD draggable item structure.
 * Checks for Card with header containing a title.
 * Close button, toggle button, and enabled switch are optional.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have data-testid="dnd-draggable-item"
  if ($el.attr("data-testid") !== "dnd-draggable-item") {
    return false;
  }

  // 3. Must have a Card wrapper
  const card = $el.find('[class*="Card_wrapper__"]');
  if (card.length === 0) {
    return false;
  }

  // 4. Must have a Card header
  const header = card.find('[class*="Card_header__"]');
  if (header.length === 0) {
    return false;
  }

  // 5. Must have a title/heading in header
  const title = header.find('[class*="Card_heading__"]');
  if (title.length === 0) {
    return false;
  }

  return true;
}
