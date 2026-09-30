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

Enjoy playing the game!