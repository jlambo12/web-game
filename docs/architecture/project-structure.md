# Project structure

This repository is organized so the game can grow without collapsing into one large file.

## Main directories

- `src/scenes` — Phaser scenes and lifecycle orchestration
- `src/game` — run logic, progression, economy, and future systems
- `src/game/loop` — movement and board helpers used by gameplay scenes
- `src/render` — rendering helpers separated from state mutation
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
- Rendering belongs in `src/render`, not inside the update loop body.

## Current runnable slice

The current scaffold already supports:

1. boot and preload scenes
2. menu scene
3. a minimal playable snake run on WASD
4. DOM HUD updates through a store
5. game over scene with restart
6. reward preview via shard economy scaffold

## Next implementation step

1. replace placeholder snake renderer with proper sprites
2. split RunScene logic into smaller systems
3. add save/load for named player profiles
4. add board expansion system visuals
5. add full roguelite upgrade loop
