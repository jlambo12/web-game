import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    const store = this.game.registry.get("profileStore");
    store?.setState({ scene: "BootScene" });
    this.scene.start("PreloadScene");
  }
}
