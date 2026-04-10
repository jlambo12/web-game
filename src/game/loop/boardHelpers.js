export function keyForCell(cell) {
  return `${cell.x},${cell.y}`;
}

export function createInitialSnake(length, boardSize) {
  const startX = Math.floor(boardSize / 2);
  const startY = Math.floor(boardSize / 2);

  return Array.from({ length }, (_, index) => ({
    x: startX - index,
    y: startY,
  }));
}

export function randomFreeCell(blocked, boardSize) {
  const blockedSet = new Set(blocked.map(keyForCell));
  const freeCells = [];

  for (let y = 0; y < boardSize; y += 1) {
    for (let x = 0; x < boardSize; x += 1) {
      const key = `${x},${y}`;
      if (!blockedSet.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return { x: 0, y: 0 };
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}
