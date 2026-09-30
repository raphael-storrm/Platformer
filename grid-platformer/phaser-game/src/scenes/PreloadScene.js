import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() { super('PreloadScene'); }

    create() {
        const graphics = this.make.graphics({ x: 0, y: 0 }, false);
        const texture = (key, draw) => {
            if (this.textures.exists(key)) return;
            graphics.clear();
            draw();
            graphics.generateTexture(key, 32, 32);
        };
        texture('tiles', () => {
            graphics.fillStyle(0x436b50).fillRect(0, 0, 32, 32);
            graphics.fillStyle(0x87c66a).fillRect(0, 0, 32, 6);
        });
        texture('player', () => {
            graphics.fillStyle(0xf06b65).fillRect(5, 2, 22, 30);
            graphics.fillStyle(0xffffff).fillRect(17, 7, 6, 6);
        });
        texture('coin', () => {
            graphics.fillStyle(0xffcf45).fillCircle(16, 16, 10);
            graphics.fillStyle(0xffed9b).fillRect(14, 9, 4, 14);
        });
        texture('spike', () => {
            graphics.fillStyle(0xd94c62).fillTriangle(0, 32, 16, 5, 32, 32);
        });
        texture('flag', () => {
            graphics.fillStyle(0xffffff).fillRect(5, 0, 3, 32);
            graphics.fillStyle(0x52d7bc).fillRect(8, 0, 22, 16);
        });
        graphics.destroy();
        this.scene.start('GameScene');
    }
}
