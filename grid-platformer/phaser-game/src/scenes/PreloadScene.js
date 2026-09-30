import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Load pixel-style textures
        this.load.image('coin', 'assets/textures/coin.png');
        this.load.image('spike', 'assets/textures/spike.png');
        this.load.image('flag', 'assets/textures/flag.png');
        // Load tileset
        this.load.image('tiles', 'assets/textures/tiles.png');
    }

    create() {
        // Start the next scene
        this.scene.start('GameScene');
    }
}

export default PreloadScene;