import Phaser from 'phaser';
import { showGameError } from '../utils/showGameError.js';
import { levelThemes } from '../utils/levelThemes.js';
import { characters, drawCharacter } from '../utils/characters.js';

export default class PreloadScene extends Phaser.Scene {
    constructor() { super('PreloadScene'); }

    create() {
        let graphics;
        const generated = [];
        try {
        graphics = this.make.graphics({ x: 0, y: 0 }, false);
        const texture = (key, draw) => {
            if (this.textures.exists(key)) return;
            graphics.clear();
            draw();
            graphics.generateTexture(key, 32, 32);
            if (!this.textures.exists(key)) throw new Error(`Could not generate texture: ${key}`);
            generated.push(key);
        };
        levelThemes.forEach((theme, index) => texture(`tiles-${index}`, () => {
            graphics.fillStyle(theme.tile).fillRect(0, 0, 32, 32);
            graphics.fillStyle(theme.edge).fillRect(0, 0, 32, 6);
            graphics.fillStyle(theme.detail);
            if (index === 0) {
                graphics.fillRect(4, 14, 4, 3).fillRect(21, 24, 5, 3);
            } else if (index === 1) {
                graphics.fillTriangle(7, 21, 12, 10, 16, 21);
                graphics.fillRect(23, 25, 3, 5);
            } else if (index === 2) {
                graphics.fillRect(0, 16, 32, 2).fillRect(15, 6, 2, 10).fillRect(6, 18, 2, 14);
            } else if (index === 3) {
                graphics.fillStyle(theme.edge).fillCircle(7, 7, 7).fillCircle(23, 7, 7);
                graphics.fillStyle(theme.detail).fillRect(4, 22, 24, 3);
            } else {
                graphics.fillStyle(0xfff4dc).fillRect(0, 0, 32, 9);
                graphics.fillStyle(0x55c8b4).fillRect(5, 3, 4, 2);
                graphics.fillStyle(0xee628e).fillRect(20, 5, 5, 2);
                graphics.fillStyle(0xffd451).fillRect(14, 1, 2, 4);
                graphics.fillStyle(theme.detail).fillRect(0, 20, 32, 3);
            }
        }));
        characters.forEach(character => {
            for (let frame = 0; frame < 2; frame++) {
                texture(`player-${character.id}-${frame}`, () => drawCharacter(graphics, character.id, frame));
            }
        });
        texture('enemy', () => {
            graphics.fillStyle(0xffffff).fillRect(3, 8, 26, 24);
            graphics.fillStyle(0xffffff).fillRect(6, 12, 7, 7).fillRect(19, 12, 7, 7);
            graphics.fillStyle(0x182b35).fillRect(8, 14, 3, 4).fillRect(21, 14, 3, 4);
        });
        texture('coin', () => {
            graphics.fillStyle(0xffcf45).fillCircle(16, 16, 10);
            graphics.fillStyle(0xffed9b).fillRect(14, 9, 4, 14);
        });
        texture('spike', () => {
            graphics.fillStyle(0xd94c62).fillTriangle(0, 32, 16, 5, 32, 32);
        });
        texture('checkpoint', () => {
            graphics.fillStyle(0xffffff).fillRect(5, 0, 3, 32);
            graphics.fillStyle(0xffcf45).fillRect(8, 0, 20, 14);
        });
        texture('flag', () => {
            graphics.fillStyle(0xffffff).fillRect(5, 0, 3, 32);
            graphics.fillStyle(0x52d7bc).fillRect(8, 0, 22, 16);
        });
        } catch (error) {
            for (const key of generated) this.textures.remove(key);
            console.error('Texture generation failed:', error);
            showGameError(this, 'Graphics could not be created. Try reloading the page.');
            return;
        } finally {
            if (graphics) graphics.destroy();
        }
        this.scene.start('MenuScene');
    }
}
