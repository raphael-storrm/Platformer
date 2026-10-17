# Grid Platformer

A desktop browser platformer with five themed stages, three selectable characters, checkpoints, patrolling enemies, three lives per run, and locally synthesized audio.

## Run the game

Prerequisites: Node.js 22 or newer, npm, and a desktop browser with a keyboard.

```sh
git clone https://github.com/raphael-storrm/Platformer.git
cd Platformer/grid-platformer/phaser-game
npm ci
npm run dev
```

Open the Local URL printed by Vite. The default port is 3000; if occupied, Vite selects another. Stop the server with Control+C.

The working application is in grid-platformer/phaser-game. Other folders are earlier prototypes. See the [app README](grid-platformer/phaser-game/README.md) for controls and source details.

## Build and preview

Run from grid-platformer/phaser-game:

```sh
npm run build
npm run preview
```

Build output is in dist. Audio starts after interaction. Progress is held only for the current page session; refreshing resets it.

## Project artifacts

- [Specification](grid-platformer/specs/001-grid-platformer/spec.md)
- [Technical plan](grid-platformer/specs/001-grid-platformer/plan.md)
- [Tasks and remaining work](grid-platformer/specs/001-grid-platformer/tasks.md)

These artifacts describe the current five-level game and were reconstructed retrospectively. They do not claim that every feature was specified before development.

The test log, evidence, analysis, and presentation are supplied separately in the submission-materials ZIP.

## Verification status

The documented clean install and build passed. Eight unit tests and twelve targeted browser checks passed using the separately archived test harness. A keyboard-only attempt completed the first two stages before a death in stage three; full five-stage normal-control completion and a human usability session remain unverified. Three development-tool dependency advisories are documented in the separate test log.
