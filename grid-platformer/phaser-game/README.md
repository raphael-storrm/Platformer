# Phaser Game

This project is a simple 2D game built using Vite, vanilla JavaScript, and Phaser with Arcade Physics. The game features a fixed 960 by 640 game area that scales to fit the browser, utilizing 32-pixel tiles for the level design.

## Project Structure

```
phaser-game
├── src
│   ├── index.html        # Main HTML file for the game
│   ├── main.js           # Entry point of the application
│   ├── assets            # Directory for game assets
│   │   └── textures      # Locally generated pixel-style textures
│   ├── scenes            # Game scenes
│   │   ├── BootScene.js  # Handles initial loading of assets
│   │   ├── GameScene.js  # Main game logic and level setup
│   │   └── PreloadScene.js # Preloads assets before the game starts
│   └── utils             # Utility functions and data
│       └── levelData.js  # Defines the layout of the game level
├── package.json          # npm configuration file
├── vite.config.js        # Vite configuration file
└── README.md             # Project documentation
```

## Installation

To install the project dependencies, run:

```
npm install
```

## Development

To start the development server, use:

```
npm run dev
```

## Build

To build the project for production, run:

```
npm run build
```

## Game Details

- The game uses a small array of tile characters to define the level layout.
- Static collision bodies are set up for solid tiles, while overlap detection is implemented for coins, spikes, and the flag.
- The game features pixel-style textures that are generated locally.

## Levels, Checkpoints, and Sound

- Distinct cues announce stage completion, finishing Candy Land, and game over.
- Back to Character Select is available during play, on completion screens, and on Game Over.
- Returning to selection abandons the current run; starting again resets lives, coins, and checkpoints.
- The Sound checkbox controls music and effects on gameplay and menu screens.

- Five settings in order: Meadow, Crystal Cavern, Sunset Summit, Cloudy Clouds, and Candy Land.
- Choose Unicorn, Leprechaun, or Skeleton on the opening screen by clicking a sprite or pressing 1/2/3.
- Characters have identical movement and collision sizes. Your selection persists across deaths, levels, and retries.
- Platforms, enemies, scenery, and HUD colors match each setting.
- Quiet synthesized background music changes melody by level, stops at victory or game over, and follows the Sound checkbox.
- Music starts after browser audio is unlocked by user interaction. No audio downloads are required.

- The opening screen shows controls; click Start Game or press Enter.
- Enemies patrol their own platforms and reverse at the ends. Any contact costs one life.
- Three lives are shared across the whole run, including level changes.
- Spikes, enemies, and falls count as deaths. Checkpoints preserve respawns, not lives.
- After the third death, Game Over offers Try Again from level one with three lives.
- R resets the current level without restoring lives.

- Five levels progress through Next Level; Play Again after Candy Land starts over.
- Stage music uses a meadow flute, cave echoes, warm summit tones, airy cloud bells, and a bouncy candy music box.
- Move with A/D or arrow keys and jump with Space.
- Yellow flags are checkpoints; they turn green when activated.
- Death returns you to the latest checkpoint and preserves collected coins.
- Before a checkpoint, death resets the level and coins.
- R resets the current level, including its checkpoint and coins.
- Jump, coin, and victory sounds are synthesized locally. Browser audio starts after user interaction.
- Uncheck Sound to mute. No audio files or external services are required.
