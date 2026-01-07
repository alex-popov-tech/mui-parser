import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";
import { detectors } from "./detectors";
import type { GatheredNode } from "./types";

/**
 * Generates a CSS selector for the root element.
 * Priority: semantic tag > CSS Modules class prefix > tag name
 */
function generateRootSelector(el: Element, $: CheerioAPI): string {
  const tagName = el.tagName?.toLowerCase();

  // Semantic tags are self-descriptive
  if (tagName && !["div", "html", "body"].includes(tagName)) {
    return tagName;
  }

  // Extract semantic prefix from CSS Modules class (e.g., "ApplicationLayout" from "ApplicationLayout_wrapper__xyz")
  const className = $(el).attr("class") || "";
  const match = className.match(/([A-Z][a-zA-Z0-9]+)_/);
  if (match) {
    return `[class*="${match[1]}_"]`;
  }

  return tagName || "div";
}

/**
 * Finds the actual content root element, skipping Cheerio's wrapper html/body tags.
 */
function findContentRoot($: CheerioAPI): Element | null {
  // Cheerio wraps content in html > head + body structure
  // We want the first meaningful child of body (or the content root)
  const body = $("body").first();
  if (body.length > 0) {
    const firstChild = body.children().first().get(0);
    if (firstChild) {
      return firstChild as Element;
    }
  }
  // Fallback to direct root child
  return $.root().children().first().get(0) as Element | null;
}

export function parseHtml(html: string): GatheredNode {
  const $ = cheerio.load(html);
  const rootEl = findContentRoot($);

  const root: GatheredNode = {
    type: "section",
    kind: "root",
    path: rootEl ? generateRootSelector(rootEl as Element, $) : "html",
  };

  const siblingCounts = new Map<string, number>();

  if (rootEl) {
    maxDepth = 0;
    $(rootEl)
      .children()
      .each((_, child) => {
        parseInto(child as Element, root, $, root.path, siblingCounts, 0);
      });
    console.error(`[DEBUG] Parsing complete. Max depth reached: ${maxDepth}`);
  }

  return root;
}

let maxDepth = 0;

function parseInto(
  el: Element,
  parent: GatheredNode,
  $: CheerioAPI,
  parentPath: string,
  siblingCounts: Map<string, number>,
  depth = 0,
): void {
  maxDepth = Math.max(maxDepth, depth);
  if (depth > 200) {
    console.error(
      `RECURSION LIMIT: depth=${depth}, tag=${el.tagName}, path=${parentPath}`,
    );
    throw new Error(`Recursion limit exceeded at depth ${depth}`);
  }
  // Run ALL detectors
  const matches = detectors
    .map((d) => ({ name: d.name, result: d.detect(el, $) }))
    .filter(
      (m): m is { name: string; result: NonNullable<typeof m.result> } =>
        m.result !== null,
    );

  // Panic if multiple match
  if (matches.length > 1) {
    const names = matches.map((m) => m.name).join(", ");
    throw new Error(
      `Multiple detectors matched at "${parentPath}": [${names}]`,
    );
  }

  if (matches.length === 1) {
    const { node, childContainers } = matches[0].result;
    // Path is set by detector - do not overwrite

    // Attach to parent
    parent.children = parent.children || [];
    parent.children.push(node);

    // Parse children from specific containers
    const childSiblingCounts = new Map<string, number>();
    for (const container of childContainers) {
      parseInto(container, node, $, node.path, childSiblingCounts, depth + 1);
    }
  } else {
    // Transparent element - parse children into same parent
    $(el)
      .children()
      .each((_, child) => {
        parseInto(
          child as Element,
          parent,
          $,
          parentPath,
          siblingCounts,
          depth + 1,
        );
      });
  }
}
