import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    this.add
      .text(270, 250, "Snake Roguelite", {
        color: "#f8fafc",
        fontSize: "28px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 290, "Стартовый экран-заглушка. Здесь позже будет выбор профиля и запуск забега.", {
        color: "#94a3b8",
        fontSize: "14px",
        align: "center",
        wordWrap: { width: 360 },
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.time.delayedCall(250, () => this.scene.start("RunScene"));
  }
}
