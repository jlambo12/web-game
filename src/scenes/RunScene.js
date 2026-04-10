import Phaser from "phaser";

import { createRun } from "../game/run/createRun.js";
import { applyXpGain, shouldLevelUp } from "../game/progression/xpSystem.js";
import { computeShardRewards } from "../game/economy/shardSystem.js";
import { PROGRESSION_CONFIG } from "../config/progressionConfig.js";

export class RunScene extends Phaser.Scene {
  constructor() {
    super("RunScene");
    this.run = null;
    this.graphics = null;
  }

  create() {
    this.graphics = this.add.graphics();
    this.run = createRun({ playerName: "Guest" });
    this.drawPlaceholderBoard();

    this.add
      .text(270, 26, "RunScene scaffold", {
        color: "#e2e8f0",
        fontSize: "18px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0);

    this.add
      .text(270, 500, `XP: ${this.run.xp}/${this.run.xpToNext} | Grid: ${this.run.boardSize} | Score food: ${PROGRESSION_CONFIG.scorePerFood}`, {
        color: "#94a3b8",
        fontSize: "12px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0.5);

    this.time.delayedCall(200, () => {
      this.run = applyXpGain(this.run, 1);
      if (shouldLevelUp(this.run)) {
        this.run.level += 1;
      }
      this.run.shardPreview = computeShardRewards({ score: 120, isNewRecord: false, totalValue: 120 });
    });
  }

  drawPlaceholderBoard() {
    this.graphics.clear();
    this.graphics.fillStyle(0x07111f, 1);
    this.graphics.fillRoundedRect(32, 48, 476, 428, 18);
    this.graphics.lineStyle(1, 0x1e293b, 1);

    for (let i = 0; i <= 20; i += 1) {
      const p = 32 + i * 21.4;
      this.graphics.beginPath();
      this.graphics.moveTo(p, 48);
      this.graphics.lineTo(p, 476);
      this.graphics.strokePath();

      const py = 48 + i * 21.4;
      this.graphics.beginPath();
      this.graphics.moveTo(32, py);
      this.graphics.lineTo(508, py);
      this.graphics.strokePath();
    }
  }
}
