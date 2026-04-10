export function getDirectionVector(direction) {
  switch (direction) {
    case "up":
      return { x: 0, y: -1 };
    case "down":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
    default:
      return { x: 1, y: 0 };
  }
}

export function isOppositeDirection(nextDirection, currentDirection) {
  return (
    (nextDirection === "up" && currentDirection === "down") ||
    (nextDirection === "down" && currentDirection === "up") ||
    (nextDirection === "left" && currentDirection === "right") ||
    (nextDirection === "right" && currentDirection === "left")
  );
}

export function stepRun(run) {
  const direction = run.pendingDirection || run.direction;
  const vector = getDirectionVector(direction);
  const head = run.snake[0];
  const nextHead = { x: head.x + vector.x, y: head.y + vector.y };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.x >= run.boardSize ||
    nextHead.y < 0 ||
    nextHead.y >= run.boardSize;

  const hitsSelf = run.snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

  if (hitsWall || hitsSelf) {
    return {
      run: {
        ...run,
        direction,
        pendingDirection: direction,
      },
      dead: true,
      ateFood: false,
    };
  }

  const ateFood = nextHead.x === run.food.x && nextHead.y === run.food.y;
  const nextSnake = [nextHead, ...run.snake];
  if (!ateFood) nextSnake.pop();

  return {
    run: {
      ...run,
      snake: nextSnake,
      direction,
      pendingDirection: direction,
    },
    dead: false,
    ateFood,
  };
}
