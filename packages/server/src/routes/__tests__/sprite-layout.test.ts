import assert from "node:assert/strict";
import test from "node:test";

import { shouldApplySpriteSheetLayout } from "../sprite-layout.js";

test("single-cell portrait requests never receive sprite-sheet layout language", () => {
  assert.equal(shouldApplySpriteSheetLayout({ cols: 1, rows: 1, generateExpressionsIndividually: false }), false);
});

test("individual expression generation never receives sprite-sheet layout language", () => {
  assert.equal(shouldApplySpriteSheetLayout({ cols: 4, rows: 4, generateExpressionsIndividually: true }), false);
});

test("multi-cell sheet requests retain the layout contract", () => {
  assert.equal(shouldApplySpriteSheetLayout({ cols: 4, rows: 4, generateExpressionsIndividually: false }), true);
});
