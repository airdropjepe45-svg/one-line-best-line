import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  'I put a "do not disturb" sign on my own door and my cat slid a note underneath it that just said "no".';

const MAX_CHARS = 240;

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 240
// characters, a single line, and not only white space. Returns a reason
// when the line fails, or null when it passes.
function validateLine(text: string): string | null {
  const chars = [...text].length;
  if (chars === 0) return "entry is empty";
  if (chars > MAX_CHARS) {
    return `entry is ${chars} characters, over the ${MAX_CHARS} limit`;
  }
  if (text.trim().length === 0) return "entry is only white space";
  if (/[\r\n]/.test(text)) return "entry must be a single line";
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    return "entry is not valid UTF-8";
  }
  return null;
}

function main(): void {
  const problem = validateLine(line);
  if (problem !== null) {
    process.stderr.write(`invalid entry: ${problem}\n`);
    process.exit(1);
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
}

main();
