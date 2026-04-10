# Project structure

This repository is organized so the game can grow without collapsing into one large file.

## Main directories

- `src/scenes` — Phaser scenes and lifecycle orchestration
- `src/game` — run logic, progression, economy, and future systems
- `src/ui` — DOM HUD, menus, notifications, overlays
- `src/services/storage` — local save and state persistence
- `src/config` — balance, input, and game configuration
- `src/styles` — CSS split by responsibility
- `docs/architecture` — architecture notes
- `public` — static files served as-is

## Rule of thumb

- Scene files should orchestrate systems, not contain all mechanics.
- Economy and progression should live in dedicated systems.
- UI should render state, not compute game rules.
- Save logic should be isolated from gameplay files.
- Balance numbers should live in config files, not be scattered across systems.

## Next implementation step

1. add real snake movement and tick engine
2. connect HUD to live run updates
3. add board expansion system
4. add full shard reward pipeline
5. add assets and preload pipeline
