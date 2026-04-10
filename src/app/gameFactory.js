import Phaser from "phaser";

import { GAME_CONFIG } from "../config/gameConfig.js";
import { BootScene } from "../scenes/BootScene.js";
import { PreloadScene } from "../scenes/PreloadScene.js";
import { MainMenuScene } from "../scenes/MainMenuScene.js";
import { RunScene } from "../scenes/RunScene.js";
import { GameOverScene } from "../scenes/GameOverScene.js";
import { createProfileStore } from "../services/storage/saveRepository.js";

export function createGame(parentElement) {
  const store = createProfileStore();

  const game = new Phaser.Game({
    ...GAME_CONFIG,
    parent: parentElement,
    scene: [BootScene, PreloadScene, MainMenuScene, RunScene, GameOverScene],
  });

  return { game, store };
}
