# Specification: Grid Platformer

Date: 2026-10-17. Status: retrospective reconstruction of the implemented scope.
This is a completed project artifact organized for the existing Spec Kit project, not a claim that this file preceded development.

## Purpose and audience

A small desktop browser game for classmates and casual platformer players. The user chooses a character, navigates five stages, and reaches the final flag within a three-life run.

## User stories and acceptance criteria

### US1 - Choose and start
- FR01: Opening screen shows controls and three recognizable characters: Unicorn, Leprechaun, Skeleton.
- FR02: Click or 1/2/3 selects; click Start Game or Enter begins with three lives.
- FR03: Character appearance remains selected across deaths, resets, stage transitions, and replay within the page session. All characters share movement and hitbox rules.

### US2 - Play a stage
- FR04: A/D and arrows move; a fresh Space press jumps only while grounded.
- FR05: Solid tiles support the player; horizontal boundaries use physics, and downward falls remain possible.
- FR06: Enemies patrol their supported platform and reverse near its ends.
- FR07: Coin overlap collects each coin once. The HUD shows current stage, available coin total, and remaining lives.
- FR08: Touching a spike or enemy, or falling below the stage, counts one death and plays a death cue.
- FR09: The third death opens Game Over; repeated callbacks during one death must not consume more lives.
- FR10: Yellow flags save a respawn point. After activation, deaths preserve collected coins and return to that point. Before activation, death restores the starting stage state.
- FR11: R resets coins/checkpoint on the current stage but does not restore lives.

### US3 - Finish and replay
- FR12: Stages occur in order: First Steps/Meadow, Up and Over/Crystal Cavern, Sunset Summit, Cloudy Clouds, Candy Land.
- FR13: A green flag completes a stage regardless of coin count. Nonfinal stages offer Next Level and preserve remaining lives.
- FR14: Finishing Candy Land shows All levels complete and Play Again. Replay begins level one with three lives.
- FR15: Back to Character Select is available during gameplay and on result screens; starting from selection begins a fresh run.

### US4 - Presentation and failure handling
- FR16: Each stage has distinct scenery, platform texture, enemy palette, and background music.
- FR17: Jump, coin, death, stage-win, game-win, and game-over cues are distinct. One Sound checkbox mutes both music and effects.
- FR18: Audio starts only when browser audio is available/unlocked. Music must not stack across restarts or continue after result transitions.
- FR19: Invalid row count/width, symbols, missing/duplicate spawn, or unsupported enemy placement produces a readable startup error instead of creating a partial scene.
- FR20: Failed generated texture creation displays a readable error.
- FR21: The 960x640 logical canvas scales proportionally inside the browser.

## Constraints and non-goals

Phaser Arcade Physics, vanilla JavaScript, Vite. Local generated art and audio. Desktop keyboard play; no account, multiplayer, server leaderboard, uploads, persisted progress, or touch controls. Code and levels are public client assets; local cheating is not an anti-cheat guarantee.

## Baseline completion evidence

A complete run must be demonstrated through ordinary movement/jump controls, without teleporting to flags or disabling hazards. State-injection regression tests alone do not prove this requirement. The recorded attempt completed stages one and two before a stage-three death. See docs/TEST-LOG.md in the separately supplied submission-materials ZIP for the detailed outcome.

## Known scope qualifications

Three lives may make upper stages difficult. The validator does not prove level reachability. A velocity cap reduces, but does not eliminate, discrete-physics tunneling. Browser permission and hardware failures can prevent audio or rendering. Some features were added after the initial single-level idea; this spec records final scope.
