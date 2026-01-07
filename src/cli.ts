#!/usr/bin/env tsx
import { readFileSync } from "node:fs";
import { writeFileSync } from "node:fs";
import { program } from "commander";
import { parseHtml } from "./parser";
import type { GatheredNode } from "./types";

function walk(node: GatheredNode, depth = 0) {
  console.log(`${"  ".repeat(depth)}${node.path}`);
  for (const child of node.children ?? []) {
    walk(child, depth + 1);
  }
}

program
  .name("html-field-parser")
  .description("Extract structured form field information from HTML")
  .version("0.1.0")
  .argument("[input]", "Input HTML file (reads from stdin if not provided)")
  .option(
    "-o, --output <file>",
    "Output file (prints to stdout if not provided)",
  )
  .action((input: string | undefined, options: { output?: string }) => {
    let html: string;

    if (input) {
      html = readFileSync(input, "utf-8");
    } else if (!process.stdin.isTTY) {
      html = readFileSync(0, "utf-8"); // Read from stdin
    } else {
      console.error("You must provide an input file or pipe HTML to stdin");
      process.exit(1);
    }

    const result = parseHtml(html);
    walk(result);
    const json = JSON.stringify(result, null, 2);

    if (options.output) {
      writeFileSync(options.output, json);
    } else {
      console.log(json);
    }
  });

program.parse();
