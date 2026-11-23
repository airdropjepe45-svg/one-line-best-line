import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  'I put a "do not disturb" sign on my own door and my cat slid a note underneath it that just said "no".';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
