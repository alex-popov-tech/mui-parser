import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

/**
 * Validates DnD droppable area structure.
 * Only checks for the area itself, not item structure.
 */
export function validate(el: Element, $: CheerioAPI): boolean {
  const $el = $(el);

  // 1. Must be a <div> element
  if (el.tagName !== "div") {
    return false;
  }

  // 2. Must have data-testid="dnd-droppable-area"
  if ($el.attr("data-testid") !== "dnd-droppable-area") {
    return false;
  }

  // 3. Must have data-rbd-droppable-id attribute
  const droppableId = $el.attr("data-rbd-droppable-id");
  if (!droppableId) {
    return false;
  }

  return true;
}
