# 2D Platformer Game

## Overview
This is a simple single-player 2D platformer game built on a tile grid. The player navigates through levels, collects coins, avoids hazards, and aims to reach the finish flag.

## Features
- Player movement controls (left, right, jump)
- Collectible coins
- Hazards (e.g., spikes)
- Finish flag to complete the level
- Colorful pixel art style

## Project Structure
```
2d-platformer-game
├── src
│   ├── assets
│   │   ├── audio          # Audio files for sound effects and background music
│   │   ├── levels         # Level design files with tile grid layouts
│   │   └── sprites        # Image files for player, coins, hazards, and flags
│   ├── components
│   │   ├── player.ts      # Player class for movement and jumping
│   │   ├── coin.ts        # Coin class for collection mechanics
│   │   ├── hazard.ts      # Hazard class for collision detection
│   │   └── flag.ts        # Flag class for level completion
│   ├── systems
│   │   ├── movement.ts    # Functions for handling player movement
│   │   ├── collision.ts    # Functions for collision detection
│   │   └── rendering.ts    # Functions for rendering game elements
│   ├── main.ts            # Entry point of the game
│   └── types
│       └── index.ts       # Types and interfaces used in the project
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd 2d-platformer-game
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the game:
   ```
   npm start
   ```

## Gameplay
- Use the left and right arrow keys (or A/D) to move the player.
- Press the spacebar to jump.
- Collect coins to increase your score.
- Avoid hazards to prevent losing the game.
- Reach the finish flag to complete the level.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.