import { createGame } from "./gameFactory.js";
import { mountHud } from "../ui/hud/HudRoot.js";

export function bootstrapApp() {
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="app-shell">
      <aside class="left-panel">
        <div class="game-panel">
          <div class="panel-header">
            <div>
              <h1>Snake Roguelite</h1>
              <p class="muted">Phaser + модульная архитектура под рост проекта.</p>
            </div>
            <span class="badge">alpha</span>
          </div>
          <div id="game-root" class="game-root"></div>
        </div>
      </aside>
      <main class="right-panel">
        <div id="hud-root"></div>
      </main>
    </div>
  `;

  const gameRoot = document.getElementById("game-root");
  const hudRoot = document.getElementById("hud-root");

  const app = createGame(gameRoot);
  mountHud(hudRoot, app.store, app.game);
}
