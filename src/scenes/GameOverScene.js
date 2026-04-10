import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create(data = {}) {
    const store = this.game.registry.get("profileStore");
    store?.setState({
      scene: "GameOverScene",
      message: data.isNewRecord ? "New record set. Press SPACE to restart." : "Press SPACE to restart.",
    });

    this.add
      .text(270, 220, "Забег завершён", {
        color: "#f8fafc",
        fontSize: "28px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 270, `Очки: ${data.score ?? 0} · Уровень: ${data.level ?? 1}` , {
        color: "#fbbf24",
        fontSize: "18px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 310, `Осколки preview: ${data.rewardPreview?.shards ?? 0}`, {
        color: "#94a3b8",
        fontSize: "14px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(270, 360, "SPACE / ENTER — restart", {
        color: "#94a3b8",
        fontSize: "14px",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    const restart = () => this.scene.start("RunScene");
    this.input.keyboard.once("keydown-SPACE", restart);
    this.input.keyboard.once("keydown-ENTER", restart);
  }
}
