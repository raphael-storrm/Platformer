import Phaser from 'phaser';
import { levelData } from '../utils/levelData.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    create() {
        this.cameras.main.setBackgroundColor('#182b35');
        this.score = 0;
        this.finished = false;
        this.platforms = this.physics.add.staticGroup();
        this.coins = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.flags = this.physics.add.staticGroup();
        levelData.forEach((row, y) => [...row].forEach((symbol, x) => {
            const px = x * 32 + 16;
            const py = y * 32 + 16;
            if (symbol === '#') this.platforms.create(px, py, 'tiles');
            if (symbol === 'C') this.coins.create(px, py, 'coin').body.setSize(20, 20).setOffset(6, 6);
            if (symbol === 'S') this.spikes.create(px, py, 'spike').body.setSize(22, 22).setOffset(5, 10);
            if (symbol === 'F') this.flags.create(px, py, 'flag');
            if (symbol === 'P') {
                this.player = this.physics.add.sprite(px, py, 'player');
                this.player.body.setSize(22, 30).setOffset(5, 2);
            }
        }));
        this.totalCoins = this.coins.getLength();
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.coins, (_, coin) => {
            if (!coin.active || this.finished) return;
            coin.disableBody(true, true);
            this.score++;
            this.counter.setText(`Coins: ${this.score}/${this.totalCoins}`);
        });
        this.physics.add.overlap(this.player, this.spikes, () => {
            if (!this.finished) { this.finished = true; this.scene.restart(); }
        });
        this.physics.add.overlap(this.player, this.flags, () => this.win());
        this.counter = this.add.text(20, 20, `Coins: 0/${this.totalCoins}`, { fontSize: '22px', color: '#ffffff' });
        this.keys = this.input.keyboard.addKeys({
            left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', jump: 'SPACE', restart: 'R'
        });
    }

    win() {
        if (this.finished) return;
        this.finished = true;
        this.physics.pause();
        this.add.rectangle(480, 290, 430, 170, 0x10202a, 0.96);
        this.add.text(480, 260, `Level complete!\nCoins: ${this.score}/${this.totalCoins}`, {
            fontSize: '28px', align: 'center', color: '#ffffff'
        }).setOrigin(0.5);
        const replay = this.add.text(480, 330, 'Play Again', {
            fontSize: '24px', color: '#52d7bc', backgroundColor: '#243f4d', padding: { x: 18, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        replay.on('pointerdown', () => this.scene.restart());
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) { this.scene.restart(); return; }
        if (this.finished) return;
        const left = this.keys.left.isDown || this.keys.a.isDown;
        const right = this.keys.right.isDown || this.keys.d.isDown;
        this.player.setVelocityX((Number(right) - Number(left)) * 220);
        if (Phaser.Input.Keyboard.JustDown(this.keys.jump) && this.player.body.blocked.down) {
            this.player.setVelocityY(-420);
        }
        this.player.x = Phaser.Math.Clamp(this.player.x, 16, 944);
        if (this.player.y > 680) this.scene.restart();
    }
}
