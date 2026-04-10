import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    const store = this.game.registry.get("profileStore");
    store?.setState({
      scene: "MainMenuScene",
      message: "Press SPACE or ENTER to start the scaffold run.",
      run: {
        status: "menu",
      },
    });

    this.add
      .text(270, 220, "Snake Roguelite", {
        color: "#f8fafc",
        fontSize: "28px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 270, "SPACE / ENTER — start\nW A S D — move", {
        color: "#94a3b8",
        fontSize: "16px",
        align: "center",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    const start = () => this.scene.start("RunScene");
    this.input.keyboard.once("keydown-SPACE", start);
    this.input.keyboard.once("keydown-ENTER", start);
  }
}
