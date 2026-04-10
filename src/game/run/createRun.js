import { PROGRESSION_CONFIG } from "../../config/progressionConfig.js";
import { createInitialSnake, randomFreeCell } from "../loop/boardHelpers.js";

export function createRun({ playerName = "Guest" } = {}) {
  const boardSize = PROGRESSION_CONFIG.baseGridSize;
  const snake = createInitialSnake(PROGRESSION_CONFIG.baseStartLength, boardSize);
  const food = randomFreeCell(snake, boardSize);

  return {
    playerName,
    score: 0,
    level: 1,
    xp: 0,
    xpToNext: PROGRESSION_CONFIG.baseXpToNext,
    boardSize,
    fieldExpansions: 0,
    shardsThisRun: 0,
    bestScoreSnapshot: 0,
    status: "ready",
    rewardsLog: [],
    snake,
    food,
    direction: "right",
    pendingDirection: "right",
    apples: 0,
    tickMs: 150,
  };
}
