import * as cheerio from "cheerio";
import type { Element } from "domhandler";

export function createContext(html: string) {
  const $ = cheerio.load(html);
  // Get the first element from body (cheerio wraps fragments in html/body)
  const el = $("body").children().first().get(0) as Element;
  return { el, $ };
}
