const BOARD_PIXEL_SIZE = 480;
const BOARD_OFFSET_X = 30;
const BOARD_OFFSET_Y = 48;

export function drawBoard(graphics, run) {
  graphics.clear();
  graphics.fillStyle(0x07111f, 1);
  graphics.fillRoundedRect(BOARD_OFFSET_X, BOARD_OFFSET_Y, BOARD_PIXEL_SIZE, BOARD_PIXEL_SIZE, 18);

  const cellSize = Math.floor(BOARD_PIXEL_SIZE / run.boardSize);
  const fieldPixels = cellSize * run.boardSize;
  const padX = BOARD_OFFSET_X + Math.floor((BOARD_PIXEL_SIZE - fieldPixels) / 2);
  const padY = BOARD_OFFSET_Y + Math.floor((BOARD_PIXEL_SIZE - fieldPixels) / 2);

  graphics.lineStyle(1, 0x1e293b, 1);
  for (let i = 0; i <= run.boardSize; i += 1) {
    const x = padX + i * cellSize;
    graphics.beginPath();
    graphics.moveTo(x, padY);
    graphics.lineTo(x, padY + fieldPixels);
    graphics.strokePath();

    const y = padY + i * cellSize;
    graphics.beginPath();
    graphics.moveTo(padX, y);
    graphics.lineTo(padX + fieldPixels, y);
    graphics.strokePath();
  }

  graphics.fillStyle(0xf97316, 1);
  graphics.fillRoundedRect(
    padX + run.food.x * cellSize + 2,
    padY + run.food.y * cellSize + 2,
    cellSize - 4,
    cellSize - 4,
    6
  );

  run.snake.forEach((segment, index) => {
    graphics.fillStyle(index === 0 ? 0x22c55e : 0x86efac, 1);
    graphics.fillRoundedRect(
      padX + segment.x * cellSize + 1,
      padY + segment.y * cellSize + 1,
      cellSize - 2,
      cellSize - 2,
      6
    );
  });
}
