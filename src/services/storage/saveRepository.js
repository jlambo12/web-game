const STORAGE_KEY = "snake-roguelite-save-v1";

const defaultState = {
  selectedPlayer: "Guest",
  scene: "BootScene",
  message: "Scaffold initialized.",
  bestScore: 0,
  lastRun: null,
  run: {
    score: 0,
    level: 1,
    xp: 0,
    xpToNext: 5,
    boardSize: 20,
    fieldExpansions: 0,
    shardsThisRun: 0,
    status: "idle",
  },
  rewardPreview: {
    shards: 0,
    reasons: [],
  },
};

function normalizePlayerName(value) {
  const normalized = String(value || "").trim().replace(/\s+/g, " ");
  return normalized || "Guest";
}

function createDefaultState(selectedPlayer = "Guest") {
  return {
    ...defaultState,
    selectedPlayer: normalizePlayerName(selectedPlayer),
    run: {
      ...defaultState.run,
    },
    rewardPreview: {
      ...defaultState.rewardPreview,
    },
  };
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    return {
      ...createDefaultState(parsed.selectedPlayer),
      ...parsed,
      selectedPlayer: normalizePlayerName(parsed.selectedPlayer),
      run: {
        ...defaultState.run,
        ...(parsed.run || {}),
      },
      rewardPreview: {
        ...defaultState.rewardPreview,
        ...(parsed.rewardPreview || {}),
      },
    };
  } catch {
    return createDefaultState();
  }
}

function persistState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage write issues in scaffold mode
  }
}

export function createProfileStore() {
  let state = loadState();
  const listeners = new Set();

  const emit = () => {
    persistState(state);
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState() {
      return state;
    },
    setState(patch) {
      state = {
        ...state,
        ...patch,
        selectedPlayer: normalizePlayerName(patch.selectedPlayer ?? state.selectedPlayer),
        run: {
          ...state.run,
          ...(patch.run || {}),
        },
        rewardPreview: {
          ...state.rewardPreview,
          ...(patch.rewardPreview || {}),
        },
      };
      emit();
    },
    setSelectedPlayer(playerName) {
      state = {
        ...state,
        selectedPlayer: normalizePlayerName(playerName),
        message: `Player profile selected: ${normalizePlayerName(playerName)}.`,
      };
      emit();
    },
    resetProgress() {
      const selectedPlayer = state.selectedPlayer;
      state = createDefaultState(selectedPlayer);
      state.message = `Progress reset for ${selectedPlayer}.`;
      emit();
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
    reset() {
      state = createDefaultState();
      emit();
    },
  };
}
