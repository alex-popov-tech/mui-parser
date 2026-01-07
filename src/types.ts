import type { CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

export interface GatheredNode<M = unknown> {
  type: "section" | "field";
  kind: string;
  /** Selector to locate root element (CSS, Playwright, or XPath) */
  path: string;
  /** Kind-specific sub-element selectors (relative to path) */
  meta?: M;
  children?: GatheredNode[];
}

export interface DetectionResult<M = unknown> {
  node: GatheredNode<M>;
  childContainers: Element[];
}

export interface Detector {
  name: string;
  detect(el: Element, $: CheerioAPI): DetectionResult | null;
}
