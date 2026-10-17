# Technical Plan

Date: 2026-10-17. Retrospective reconstruction; describes the existing implementation and verification plan.

## Architecture

Vite serves src/index.html. main.js registers BootScene -> PreloadScene -> MenuScene -> GameScene. PreloadScene draws textures locally. MenuScene selects one of three characters and starts a run. GameScene owns physics, coins, checkpoints, enemies, life count, and stage transitions. Game Over reuses MenuScene.

Each stage is 30 columns x 20 rows at 32 pixels per tile. Symbols: # solid, . empty, P spawn, C coin, S spike, E enemy, K checkpoint, F finish. Static bodies represent tiles and collectibles; the player uses a dynamic Arcade body. Enemy patrol limits derive from contiguous support tiles. Movement speed is 220px/s, jump velocity -420px/s, gravity 900px/s2, and velocity limits 300/600px/s.

## Run state and transitions

Scene data carries levelIndex, character, deaths, checkpoint, and collected coin IDs. Registry stores character choice for the page session. There is no persistence.
- Death sets a guard, pauses physics, stops music, plays the cue, then waits 220ms.
- Before the third death, restart restores checkpoint data if present.
- Third death switches to MenuScene's Game Over state.
- Stage completion pauses physics, stops music, and offers next/replay.
- R resets stage state but carries deaths.
- Returning to selection abandons progress.

## Art and audio

Graphics-generated 32x32 textures provide characters, tiles, enemies, flags, coins, and hazards. Themes add non-colliding scenery behind gameplay. Two player frames alternate during walking. Web Audio oscillators create effects; cached audio buffers create stage loops. Music and effects route through Phaser's mute destination. Scene shutdown cleans audio nodes, retry timers, and listeners.

## Safety and reliability boundaries

Validate level structure before creating physics objects. Use world bounds rather than direct x clamping. Guard transition and death entry points. Keep development servers on loopback during tests. Browser state can be edited by its owner; trusted competitive scoring would need a separate server architecture. Dependency advisories remain tracked work.

## Verification

1. Node tests: valid/invalid levels, restart guard, lifecycle-sensitive state and audio.
2. Browser regression: selection, hazards, checkpoint coins, stage order, result screens, audio cues, mute, refresh, and rapid input.
3. Security probes: source inspection, local state manipulation, malformed level injection, plus npm audit.
4. Separate keyboard-only playthrough attempt; record failure honestly.
5. Another person plays without help; a real human session is required and remains outside automated verification.

Tests may inspect private state to verify outcomes, but the full-run attempt must not alter player position, lives, hazards, or completion state.

The executed tests, scripts, and results are preserved in the separate submission-materials ZIP, not this repo. Follow ZIP-README.md in that archive to rerun its test harness on a separate copy of the game.
