import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load any assets needed for the boot scene here
    }

    create() {
        // Transition to the PreloadScene
        this.scene.start('PreloadScene');
    }
}

export default BootScene;