import Phaser from "phaser";

import { createRun } from "../game/run/createRun.js";
import { randomFreeCell } from "../game/loop/boardHelpers.js";
import { isOppositeDirection, stepRun } from "../game/loop/movementSystem.js";
import { applyXpGain, shouldLevelUp, consumeLevelUp } from "../game/progression/xpSystem.js";
import { computeShardRewards } from "../game/economy/shardSystem.js";
import { PROGRESSION_CONFIG } from "../config/progressionConfig.js";
import { drawBoard } from "../render/board/boardRenderer.js";

export class RunScene extends Phaser.Scene {
  constructor() {
    super("RunScene");
    this.run = null;
    this.graphics = null;
    this.store = null;
    this.timer = null;
    this.keys = null;
    this.titleText = null;
    this.footerText = null;
  }

  create() {
    this.store = this.game.registry.get("profileStore");
    const state = this.store?.getState();
    const playerName = state?.selectedPlayer || "Guest";

    this.run = createRun({ playerName });
    this.graphics = this.add.graphics();

    this.titleText = this.add
      .text(270, 20, "RunScene", {
        color: "#e2e8f0",
        fontSize: "18px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0);

    this.footerText = this.add
      .text(270, 516, "WASD to move", {
        color: "#94a3b8",
        fontSize: "12px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0.5);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.timer = this.time.addEvent({
      delay: this.run.tickMs,
      loop: true,
      callback: () => this.tick(),
    });

    this.run.status = "running";
    this.syncStore("Run started.");
    this.renderRun();
  }

  update() {
    if (!this.run) return;

    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) this.queueDirection("up");
    if (Phaser.Input.Keyboard.JustDown(this.keys.down)) this.queueDirection("down");
    if (Phaser.Input.Keyboard.JustDown(this.keys.left)) this.queueDirection("left");
    if (Phaser.Input.Keyboard.JustDown(this.keys.right)) this.queueDirection("right");
  }

  queueDirection(nextDirection) {
    if (isOppositeDirection(nextDirection, this.run.direction)) return;
    this.run.pendingDirection = nextDirection;
  }

  tick() {
    const { run, dead, ateFood } = stepRun(this.run);
    this.run = run;

    if (dead) {
      this.finishRun();
      return;
    }

    if (ateFood) {
      this.run.apples += 1;
      this.run.score += PROGRESSION_CONFIG.scorePerFood;
      this.run = applyXpGain(this.run, 1);
      this.run.food = randomFreeCell(this.run.snake, this.run.boardSize);

      if (this.run.apples % 5 === 0) {
        this.run.shardsThisRun += 1;
      }

      if (shouldLevelUp(this.run)) {
        this.run = consumeLevelUp(this.run);
        this.run.shardsThisRun += 1;
      }
    }

    const storeState = this.store?.getState();
    const bestScore = storeState?.bestScore || 0;
    this.run.shardPreview = computeShardRewards({
      score: this.run.score,
      isNewRecord: this.run.score > bestScore,
      totalValue: this.run.score + this.run.level * 25 + this.run.xp * 5,
    });

    this.syncStore(ateFood ? "Food collected." : "Run in progress.");
    this.renderRun();
  }

  finishRun() {
    const storeState = this.store?.getState();
    const bestScore = storeState?.bestScore || 0;
    const isNewRecord = this.run.score > bestScore;
    const rewardPreview = computeShardRewards({
      score: this.run.score,
      isNewRecord,
      totalValue: this.run.score + this.run.level * 25 + this.run.xp * 5,
    });

    this.store?.setState({
      scene: "GameOverScene",
      message: isNewRecord ? "New record achieved." : "Run ended.",
      bestScore: Math.max(bestScore, this.run.score),
      lastRun: this.run,
      run: {
        ...this.run,
        status: "gameover",
      },
      rewardPreview,
    });

    this.scene.start("GameOverScene", {
      score: this.run.score,
      level: this.run.level,
      rewardPreview,
      isNewRecord,
    });
  }

  syncStore(message) {
    const storeState = this.store?.getState();
    const bestScore = storeState?.bestScore || 0;

    this.store?.setState({
      selectedPlayer: this.run.playerName,
      scene: "RunScene",
      message,
      run: {
        score: this.run.score,
        level: this.run.level,
        xp: this.run.xp,
        xpToNext: this.run.xpToNext,
        boardSize: this.run.boardSize,
        fieldExpansions: this.run.fieldExpansions,
        shardsThisRun: this.run.shardsThisRun,
        status: this.run.status,
      },
      rewardPreview: this.run.shardPreview || computeShardRewards({
        score: this.run.score,
        isNewRecord: this.run.score > bestScore,
        totalValue: this.run.score + this.run.level * 25 + this.run.xp * 5,
      }),
    });
  }

  renderRun() {
    drawBoard(this.graphics, this.run);
    this.titleText.setText(`RunScene · Score ${this.run.score} · Level ${this.run.level}`);
    this.footerText.setText(`XP ${this.run.xp}/${this.run.xpToNext} · Shards ${this.run.shardsThisRun}`);
  }
}
