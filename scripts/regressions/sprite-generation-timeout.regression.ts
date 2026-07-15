import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const modalSource = await readFile(
  join(root, "packages/client/src/components/ui/SpriteGenerationModal.tsx"),
  "utf8",
);

assert.match(
  modalSource,
  /const SPRITE_GENERATION_REQUEST_TIMEOUT_MS = 30 \* 60_000;/,
  "sprite generation must allow the complete sequential local generation run, not abort after five minutes",
);
assert.doesNotMatch(
  modalSource,
  /Sprite generation timed out after about 5 minutes/,
  "the timeout guidance must not claim the obsolete five-minute limit",
);

const routeSource = await readFile(join(root, "packages/server/src/routes/sprites.routes.ts"), "utf8");
assert.match(
  routeSource,
  /MAX_COMFYUI_INDIVIDUAL_SPRITE_EXPRESSIONS = 16/,
  "ComfyUI's one-at-a-time sprite mode must retain a complete 16-expression preset",
);
assert.match(
  routeSource,
  /maxIndividualExpressions:\s*useComfyIndividualExpressions\s*\?\s*MAX_COMFYUI_INDIVIDUAL_SPRITE_EXPRESSIONS\s*:\s*undefined/,
  "both sprite plan call sites must give ComfyUI the 16-sprite allowance",
);

const previewRouteStart = routeSource.indexOf('app.post("/generate-sheet/preview"');
const previewRouteEnd = routeSource.indexOf('app.post("/generate-animated-expressions/preview"');
const previewRouteSource = routeSource.slice(previewRouteStart, previewRouteEnd);
assert.match(
  previewRouteSource,
  /if \(plan\.spriteType === "full-body"\)/,
  "ComfyUI full-body preview must use the same individual full-body prompt path as generation",
);

console.log("sprite generation timeout regression checks passed");
