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

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
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
    return defaultState;
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

  return {
    getState() {
      return state;
    },
    setState(patch) {
      state = {
        ...state,
        ...patch,
        run: {
          ...state.run,
          ...(patch.run || {}),
        },
        rewardPreview: {
          ...state.rewardPreview,
          ...(patch.rewardPreview || {}),
        },
      };
      persistState(state);
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
    reset() {
      state = { ...defaultState };
      persistState(state);
      listeners.forEach((listener) => listener(state));
    },
  };
}
