import { PROGRESSION_CONFIG } from "../../config/progressionConfig.js";

export function applyXpGain(run, xpGain) {
  return {
    ...run,
    xp: run.xp + xpGain,
  };
}

export function shouldLevelUp(run) {
  return run.xp >= run.xpToNext;
}

export function consumeLevelUp(run) {
  const nextLevel = run.level + 1;
  const nextXpToNext = Math.round(run.xpToNext * PROGRESSION_CONFIG.xpGrowthFactor) + 1;
  const nextBoardSize = computeBoardSize(nextLevel);

  return {
    ...run,
    level: nextLevel,
    xp: run.xp - run.xpToNext,
    xpToNext: nextXpToNext,
    boardSize: nextBoardSize,
    fieldExpansions: computeFieldExpansions(nextLevel),
  };
}

export function computeFieldExpansions(level) {
  if (level < PROGRESSION_CONFIG.fieldExpansionStartLevel) return 0;
  return Math.min(
    PROGRESSION_CONFIG.maxFieldExpansions,
    level - PROGRESSION_CONFIG.fieldExpansionStartLevel + 1
  );
}

export function computeBoardSize(level) {
  return PROGRESSION_CONFIG.baseGridSize + computeFieldExpansions(level) * PROGRESSION_CONFIG.fieldExpansionStep;
}
