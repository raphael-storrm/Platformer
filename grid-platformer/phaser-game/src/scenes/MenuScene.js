import Phaser from 'phaser';
import { characters } from '../utils/characters.js';
import { levels } from '../utils/levelData.js';
import { playEffect } from '../utils/playEffect.js';
import { bindSoundToggle } from '../utils/bindSoundToggle.js';

export default class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }

    create(data = {}) {
        this.starting = false;
        this.cameras.main.setBackgroundColor('#182b35');
        const gameOver = data.gameOver === true;
        bindSoundToggle(this);
        if (gameOver) playEffect(this, 'gameOver');
        this.selectedCharacter = characters.some(c => c.id === data.character)
            ? data.character : this.registry.get('character') || characters[0].id;
        this.add.text(480, 52, gameOver ? 'Game Over' : 'Grid Platformer', {
            fontSize: '40px', color: gameOver ? '#f06b65' : '#ffffff'
        }).setOrigin(0.5);
        this.add.text(480, 101, gameOver
            ? `Three lives lost. You reached level ${data.reached || 1}.`
            : `${levels.length} levels. Three lives. Reach the green flag.`, {
            fontSize: '19px', color: '#82edb2'
        }).setOrigin(0.5);
        this.add.text(480, 146, 'Choose your character', {
            fontSize: '20px', color: '#ffffff'
        }).setOrigin(0.5);
        this.choices = characters.map((character, i) => {
            const x = 260 + i * 220;
            const frame = this.add.rectangle(x, 246, 180, 148, 0x243f4d)
                .setStrokeStyle(2, 0x48636d).setInteractive({ useHandCursor: true });
            this.add.image(x, 228, `player-${character.id}-0`).setScale(2.5);
            this.add.text(x, 294, character.name, {
                fontSize: '18px', color: '#ffffff'
            }).setOrigin(0.5);
            frame.on('pointerdown', () => this.selectCharacter(character.id));
            return { id: character.id, frame };
        });
        this.selectCharacter(this.selectedCharacter);
        this.add.text(480, 346, '1 / 2 / 3 to select', {
            fontSize: '16px', color: '#b5c9cf'
        }).setOrigin(0.5);
        this.add.text(480, 423, [
            'A/D or arrows: move    Space: jump',
            'R: reset level (lives stay the same)',
            'Yellow flags save checkpoints.',
            'Avoid enemies and spikes. Three deaths end the run.'
        ].join('\n'), {
            fontSize: '18px', lineSpacing: 10, align: 'center', color: '#ffffff'
        }).setOrigin(0.5);
        const start = () => {
            if (this.starting) return;
            this.starting = true;
            this.scene.start('GameScene', { levelIndex: 0, deaths: 0, character: this.selectedCharacter });
        };
        const button = this.add.text(480, 536, gameOver ? 'Try Again' : 'Start Game', {
            fontSize: '26px', color: '#52d7bc', backgroundColor: '#243f4d',
            padding: { x: 24, y: 12 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        button.on('pointerdown', start);
        button.on('pointerover', () => button.setColor('#ffffff'));
        button.on('pointerout', () => button.setColor('#52d7bc'));
        if (gameOver) {
            this.add.text(480, 589, 'Back to Character Select', {
                fontSize: '17px', color: '#ffffff'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                if (this.starting) return;
                this.starting = true;
                this.scene.restart({ character: this.selectedCharacter });
            });
        }
        this.add.text(480, gameOver ? 625 : 593, 'Press Enter to start', {
            fontSize: '16px', color: '#b5c9cf'
        }).setOrigin(0.5);
        const selectKey = event => {
            const character = characters[Number(event.key) - 1];
            if (character) this.selectCharacter(character.id);
        };
        this.input.keyboard.on('keydown', selectKey);
        this.input.keyboard.on('keydown-ENTER', start);
        this.events.once('shutdown', () => {
            this.input.keyboard.off('keydown', selectKey);
            this.input.keyboard.off('keydown-ENTER', start);
        });
    }

    selectCharacter(id) {
        if (!characters.some(character => character.id === id)) id = characters[0].id;
        this.selectedCharacter = id;
        this.registry.set('character', id);
        this.choices.forEach(choice => choice.frame.setStrokeStyle(
            choice.id === id ? 3 : 1, choice.id === id ? 0x82edb2 : 0x48636d
        ));
    }
}
