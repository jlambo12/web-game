import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // TODO: load sprite atlases, audio, UI icons, and data files here.
  }

  create() {
    this.scene.start("MainMenuScene");
  }
}
