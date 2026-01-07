import { execSync } from "node:child_process";
import { mkdtempSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("cli", () => {
  it("parses html file and outputs json", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "html-field-parser-"));
    const inputFile = join(tempDir, "input.html");

    writeFileSync(inputFile, "<html><body></body></html>");

    const result = execSync(`npx tsx src/cli.ts ${inputFile}`, {
      encoding: "utf-8",
      cwd: process.cwd(),
    });

    const parsed = JSON.parse(result);
    expect(parsed).toEqual({
      type: "section",
      kind: "root",
      path: "html",
    });

    unlinkSync(inputFile);
  });

  it("reads from stdin when no file provided", () => {
    const result = execSync(
      'echo "<html><body></body></html>" | npx tsx src/cli.ts',
      {
        encoding: "utf-8",
        cwd: process.cwd(),
      },
    );

    const parsed = JSON.parse(result);
    expect(parsed).toEqual({
      type: "section",
      kind: "root",
      path: "html",
    });
  });
});
