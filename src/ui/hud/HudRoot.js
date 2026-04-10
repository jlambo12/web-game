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
      <p class="muted">This is a DOM HUD scaffold separated from Phaser scene code.</p>
    </section>

    <section class="hud-section">
      <h3>Player and run</h3>
      <div class="hud-grid">
        ${createStatCard("Игрок", state.selectedPlayer, "Selected profile")}
        ${createStatCard("Scene", state.scene, "Current Phaser scene")}
        ${createStatCard("Score", state.run.score, "Current run score")}
        ${createStatCard("Shards", state.run.shardsThisRun, "Session shards")}
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
        Grid ${state.run.boardSize}x${state.run.boardSize}, expansions ${state.run.fieldExpansions}
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
      <h3>Status</h3>
      <div class="hud-card">
        <div class="hud-label">Message</div>
        <div class="hud-hint">${state.message}</div>
      </div>
    </section>
  `;
}

export function mountHud(container, store) {
  const render = (state) => {
    container.innerHTML = renderHud(state);
  };

  store.subscribe(render);
}
