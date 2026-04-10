import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create(data = {}) {
    const score = data.score ?? 0;

    this.add
      .text(270, 240, "Забег завершён", {
        color: "#f8fafc",
        fontSize: "28px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 286, `Очки: ${score}` , {
        color: "#fbbf24",
        fontSize: "18px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);
  }
}
