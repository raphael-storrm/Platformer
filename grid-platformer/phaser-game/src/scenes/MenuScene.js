import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }

    create(data = {}) {
        this.starting = false;
        this.cameras.main.setBackgroundColor('#182b35');
        const gameOver = data.gameOver === true;
        this.add.text(480, 100, gameOver ? 'Game Over' : 'Grid Platformer', {
            fontSize: '44px', color: gameOver ? '#f06b65' : '#ffffff'
        }).setOrigin(0.5);
        this.add.text(480, 158, gameOver
            ? `Three lives lost. You reached level ${data.reached || 1}.`
            : 'Three levels. Three lives. Reach the green flag.', {
            fontSize: '20px', color: '#82edb2'
        }).setOrigin(0.5);
        const controls = [
            'A / D or arrow keys     Move',
            'Space                   Jump',
            'R                       Reset current level',
            '',
            'Yellow flags save your checkpoint.',
            'Avoid spikes and patrolling enemies.',
            'Three deaths end your run.',
            'Resetting a level does not restore lives.'
        ];
        this.add.text(480, 320, controls.join('\n'), {
            fontSize: '20px', lineSpacing: 10, color: '#ffffff'
        }).setOrigin(0.5);
        const start = () => {
            if (this.starting) return;
            this.starting = true;
            this.scene.start('GameScene', { levelIndex: 0, deaths: 0 });
        };
        const button = this.add.text(480, 510, gameOver ? 'Try Again' : 'Start Game', {
            fontSize: '26px', color: '#52d7bc', backgroundColor: '#243f4d',
            padding: { x: 24, y: 12 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        button.on('pointerdown', start);
        button.on('pointerover', () => button.setColor('#ffffff'));
        button.on('pointerout', () => button.setColor('#52d7bc'));
        this.add.text(480, 572, 'Press Enter to start', {
            fontSize: '18px', color: '#b5c9cf'
        }).setOrigin(0.5);
        this.input.keyboard.on('keydown-ENTER', start);
        this.events.once('shutdown', () => this.input.keyboard.off('keydown-ENTER', start));
    }
}
