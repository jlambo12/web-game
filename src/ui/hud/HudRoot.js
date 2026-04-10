function createStatCard(label, value, hint = "") {
  return `
    <div class="hud-card">
      <div class="hud-label">${label}</div>
      <div class="hud-value">${value}</div>
      <div class="hud-hint">${hint}</div>
    </div>
  `;
}

function renderHud(state) {
  const progressPercent = Math.min(100, Math.round((state.run.xp / state.run.xpToNext) * 100));

  return `
    <section class="hud-section">
      <h2>Project HUD</h2>
      <p class="muted">DOM HUD отдельно от Phaser-сцен. Это база для будущих меню, наград и прогрессии.</p>
    </section>

    <section class="hud-section">
      <h3>Player profile</h3>
      <div class="hud-card hud-card-tight">
        <div class="hud-label">Имя игрока</div>
        <div class="hud-actions">
          <input id="player-name-input" class="hud-input" value="${state.selectedPlayer}" maxlength="24" placeholder="Введите имя" />
          <div class="hud-buttons">
            <button id="save-player-button" class="hud-button">Сохранить имя</button>
            <button id="start-run-button" class="hud-button secondary">Старт</button>
            <button id="menu-button" class="hud-button secondary">Меню</button>
            <button id="reset-progress-button" class="hud-button danger">Сбросить прогресс</button>
          </div>
        </div>
        <div class="hud-hint">Имя сохраняется в localStorage и используется в следующих забегах.</div>
      </div>
    </section>

    <section class="hud-section">
      <h3>Player and run</h3>
      <div class="hud-grid">
        ${createStatCard("Игрок", state.selectedPlayer, "Selected profile")}
        ${createStatCard("Scene", state.scene, "Current Phaser scene")}
        ${createStatCard("Score", state.run.score, "Current run score")}
        ${createStatCard("Best", state.bestScore, "Saved best score")}
        ${createStatCard("Shards", state.run.shardsThisRun, "Session shards")}
        ${createStatCard("Status", state.run.status, "Run state")}
      </div>
    </section>

    <section class="hud-section">
      <h3>Progression preview</h3>
      <div class="progress-row">
        <span>XP to next level</span>
        <strong>${state.run.xp} / ${state.run.xpToNext}</strong>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPercent}%"></div>
      </div>
      <div class="muted" style="margin-top: 10px;">
        Grid ${state.run.boardSize}x${state.run.boardSize}, expansions ${state.run.fieldExpansions}, level ${state.run.level}
      </div>
    </section>

    <section class="hud-section">
      <h3>Shard reward preview</h3>
      <div class="hud-card">
        <div class="hud-label">Computed reward</div>
        <div class="hud-value">${state.rewardPreview.shards}</div>
        <div class="hud-hint">${state.rewardPreview.reasons.join(" · ") || "No reward preview yet"}</div>
      </div>
    </section>

    <section class="hud-section">
      <h3>Controls</h3>
      <div class="hud-card">
        <div class="hud-hint">W / A / S / D — movement</div>
        <div class="hud-hint">Space — start / restart from menu</div>
        <div class="hud-hint">После смерти откроется Game Over scene.</div>
      </div>
    </section>

    <section class="hud-section">
      <h3>Status</h3>
      <div class="hud-card">
        <div class="hud-label">Message</div>
        <div class="hud-hint">${state.message}</div>
      </div>
    </section>
  `;
}

function wireHudEvents(container, store, game) {
  const playerNameInput = container.querySelector("#player-name-input");
  const savePlayerButton = container.querySelector("#save-player-button");
  const startRunButton = container.querySelector("#start-run-button");
  const menuButton = container.querySelector("#menu-button");
  const resetProgressButton = container.querySelector("#reset-progress-button");

  savePlayerButton?.addEventListener("click", () => {
    store.setSelectedPlayer(playerNameInput?.value);
  });

  playerNameInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      store.setSelectedPlayer(playerNameInput.value);
    }
  });

  startRunButton?.addEventListener("click", () => {
    if (playerNameInput) {
      store.setSelectedPlayer(playerNameInput.value);
    }
    game.scene.start("RunScene");
  });

  menuButton?.addEventListener("click", () => {
    if (playerNameInput) {
      store.setSelectedPlayer(playerNameInput.value);
    }
    game.scene.start("MainMenuScene");
  });

  resetProgressButton?.addEventListener("click", () => {
    store.resetProgress();
    game.scene.start("MainMenuScene");
  });
}

export function mountHud(container, store, game) {
  const render = (state) => {
    container.innerHTML = renderHud(state);
    wireHudEvents(container, store, game);
  };

  store.subscribe(render);
}
