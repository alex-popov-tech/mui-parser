#!/usr/bin/env tsx
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { program } from "commander";
import { parseHtml } from "./parser";
import type { GatheredNode } from "./types";

function getDetectorsPath(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, "detectors");
}

function copyDetectorDocs(outputFolder: string): void {
  const detectorsPath = getDetectorsPath();
  const docOutputPath = join(outputFolder, "doc");
  mkdirSync(docOutputPath, { recursive: true });

  const detectorDirs = readdirSync(detectorsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const detectorName of detectorDirs) {
    const sourceDocPath = join(detectorsPath, detectorName, "doc");
    if (existsSync(sourceDocPath)) {
      cpSync(sourceDocPath, join(docOutputPath, detectorName), {
        recursive: true,
      });
    }
  }
}

function walk(node: GatheredNode, depth = 0) {
  console.log(`${"  ".repeat(depth)}${node.path}`);
  for (const child of node.children ?? []) {
    walk(child, depth + 1);
  }
}

program
  .name("mui-parser")
  .description("Extract structured form field information from HTML")
  .version("0.1.0")
  .argument("[input]", "Input HTML file (reads from stdin if not provided)")
  .option(
    "-o, --output <folder>",
    "Output folder (creates parsed.json and doc/)",
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
      const outputFolder = options.output;
      mkdirSync(outputFolder, { recursive: true });
      writeFileSync(join(outputFolder, "parsed.json"), json);
      copyDetectorDocs(outputFolder);
    } else {
      console.log(json);
    }
  });

program.parse();
