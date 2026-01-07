import { describe, expect, it } from "vitest";
import { parseHtml } from "../src/parser";

describe("parseHtml", () => {
  it("returns root node for empty html", () => {
    const result = parseHtml("<html><body></body></html>");

    expect(result).toEqual({
      type: "section",
      kind: "root",
      path: "html",
    });
  });

  it("returns root node for html with no detected elements", () => {
    const result = parseHtml(`
      <html>
        <body>
          <div>
            <span>Hello</span>
          </div>
        </body>
      </html>
    `);

    expect(result).toEqual({
      type: "section",
      kind: "root",
      path: "div",
    });
  });
});
