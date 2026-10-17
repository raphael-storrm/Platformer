# Grid Platformer

The working game uses Phaser, JavaScript, and Vite. It runs locally with no backend, account, API keys, or downloaded game assets.

## Setup

Prerequisites: Node.js 22+, npm, a desktop browser, and keyboard.

From the repository root:

```sh
cd grid-platformer/phaser-game
npm ci
npm run dev
```

Open the Local URL printed in the terminal. Control+C stops the server.

## Build

```sh
npm run build
npm run preview
```

Vite serves src/index.html and writes production files to dist.

## Play

- Choose Unicorn, Leprechaun, or Skeleton by clicking or pressing 1/2/3; Enter starts.
- A/D or arrows move; Space jumps while grounded.
- Yellow flags save checkpoints. Death afterward preserves collected coins.
- Spikes, enemies, and falls cost one life. Three deaths end the run.
- Green flags advance stages; coins are optional.
- R resets the current stage without restoring lives.
- Back to Character Select abandons the run. Starting again restores three lives.
- Sound toggles music and effects.

Stages: First Steps (Meadow), Up and Over (Crystal Cavern), Sunset Summit, Cloudy Clouds, Candy Land. Characters share the same movement and collision rules.

## Source

- src/main.js registers scenes and Arcade Physics.
- src/scenes handles setup, character selection, gameplay, and results.
- src/utils/levelData.js defines the five 30x20 tile layouts.
- src/utils/validateLevel.js validates level structure.
- src/utils/characters.js and levelThemes.js draw local sprites and scenery.
- src/utils/backgroundMusic.js and playEffect.js synthesize audio.

Desktop keyboard play is the target. No touch controls or persistent saves are included. Refreshing abandons the run, and character selection lasts only for the page session.

## Project artifacts

See the [specification](../specs/001-grid-platformer/spec.md), [plan](../specs/001-grid-platformer/plan.md), and [tasks](../specs/001-grid-platformer/tasks.md).
The test harness and other submission materials are distributed in a separate ZIP; test commands are not installed in this app folder.
