export function shouldApplySpriteSheetLayout({
  cols,
  rows,
  generateExpressionsIndividually,
}: {
  cols: number;
  rows: number;
  generateExpressionsIndividually: boolean;
}): boolean {
  return !generateExpressionsIndividually && cols * rows > 1;
}
