import Phaser from 'phaser';
import { levels } from '../utils/levelData.js';
import { validateLevel } from '../utils/validateLevel.js';
import { showGameError } from '../utils/showGameError.js';
import { playEffect } from '../utils/playEffect.js';
import { drawLevelBackground } from '../utils/levelThemes.js';
import { startBackgroundMusic } from '../utils/backgroundMusic.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    init(data = {}) {
        this.levelIndex = Number.isInteger(data.levelIndex) && data.levelIndex >= 0 &&
            data.levelIndex < levels.length ? data.levelIndex : 0;
        this.checkpoint = data.checkpoint || null;
        this.collected = new Set(data.collected || []);
        this.deaths = Number.isInteger(data.deaths) ? Phaser.Math.Clamp(data.deaths, 0, 2) : 0;
    }

    create() {
        this.cameras.main.setBackgroundColor('#182b35');
        this.finished = false;
        this.restarting = false;
        this.keys = null;
        this.player = null;
        const level = levels[this.levelIndex];
        try {
            validateLevel(level.tiles, this.scale.width / 32, this.scale.height / 32);
        } catch (error) {
            this.finished = true;
            showGameError(this, error.message);
            return;
        }
        this.physics.resume();
        const theme = drawLevelBackground(this, this.levelIndex);
        this.physics.world.setBounds(5, 0, this.scale.width - 10, this.scale.height, true, true, true, false);
        this.platforms = this.physics.add.staticGroup();
        this.coins = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.flags = this.physics.add.staticGroup();
        this.checkpoints = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group({ allowGravity: false, immovable: true });
        this.totalCoins = 0;
        level.tiles.forEach((row, y) => [...row].forEach((symbol, x) => {
            const px = x * 32 + 16;
            const py = y * 32 + 16;
            if (symbol === '#') this.platforms.create(px, py, `tiles-${this.levelIndex}`);
            if (symbol === 'C') {
                this.totalCoins++;
                const coin = this.coins.create(px, py, 'coin');
                coin.setData('id', `${x},${y}`);
                coin.body.setSize(20, 20).setOffset(6, 6);
                if (this.collected.has(coin.getData('id'))) coin.disableBody(true, true);
            }
            if (symbol === 'S') this.spikes.create(px, py, 'spike').body.setSize(22, 22).setOffset(5, 10);
            if (symbol === 'F') this.flags.create(px, py, 'flag');
            if (symbol === 'E') {
                // Patrol the contiguous solid platform beneath this enemy.
                const support = level.tiles[y + 1];
                let left = x;
                let right = x;
                while (support[left - 1] === '#') left--;
                while (support[right + 1] === '#') right++;
                const enemy = this.enemies.create(px, py, 'enemy').setTint(theme.enemy);
                enemy.body.setSize(26, 24).setOffset(3, 8);
                enemy.setData('left', left * 32 + 16);
                enemy.setData('right', right * 32 + 16);
                enemy.setVelocityX(left === right ? 0 : 65 + this.levelIndex * 15);
            }
            if (symbol === 'K') {
                const checkpoint = this.checkpoints.create(px, py, 'checkpoint');
                if (this.checkpoint?.x === px && this.checkpoint?.y === py) checkpoint.setTint(0x66ff99);
            }
            if (symbol === 'P') {
                this.player = this.physics.add.sprite(this.checkpoint?.x ?? px, this.checkpoint?.y ?? py, 'player');
                this.player.body.setSize(22, 30).setOffset(5, 2);
                this.player.body.setMaxVelocity(300, 600);
                this.player.setCollideWorldBounds(true);
            }
        }));
        this.score = this.collected.size;
        this.counter = this.add.text(20, 20, '', { fontSize: '20px', color: theme.ink });
        this.status = this.add.text(20, 50, this.checkpoint ? 'Checkpoint saved' : theme.name, { fontSize: '18px', color: theme.accent });
        this.refreshCounter();
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.coins, (_, coin) => {
            if (!coin.active || this.finished || this.restarting) return;
            coin.disableBody(true, true);
            this.collected.add(coin.getData('id'));
            this.score = this.collected.size;
            this.refreshCounter();
            playEffect(this, 'coin');
        });
        this.physics.add.overlap(this.player, this.spikes, () => {
            this.die();
        });
        this.physics.add.overlap(this.player, this.enemies, () => this.die());
        this.physics.add.overlap(this.player, this.checkpoints, (_, checkpoint) => {
            if (this.finished || this.restarting) return;
            if (this.checkpoint?.x === checkpoint.x && this.checkpoint?.y === checkpoint.y) return;
            this.checkpoints.children.iterate(item => item.clearTint());
            this.checkpoint = { x: checkpoint.x, y: checkpoint.y };
            checkpoint.setTint(0x66ff99);
            this.status.setText('Checkpoint saved');
        });
        this.physics.add.overlap(this.player, this.flags, () => this.win());
        this.keys = this.input.keyboard.addKeys({
            left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', jump: 'SPACE', restart: 'R'
        });
        const soundToggle = document.getElementById('sound-enabled');
        if (soundToggle) {
            this.sound.mute = !soundToggle.checked;
            const changeSound = () => { this.sound.mute = !soundToggle.checked; };
            soundToggle.addEventListener('change', changeSound);
            this.events.once('shutdown', () => soundToggle.removeEventListener('change', changeSound));
        }
        this.stopMusic = startBackgroundMusic(this, this.levelIndex);
    }

    refreshCounter() {
        this.counter.setText(`Level ${this.levelIndex + 1}/${levels.length}: ${levels[this.levelIndex].name}    Coins: ${this.score}/${this.totalCoins}    Lives: ${3 - this.deaths}/3`);
    }

    win() {
        if (this.finished || this.restarting) return;
        this.finished = true;
        this.physics.pause();
        this.stopMusic?.();
        playEffect(this, 'win');
        const last = this.levelIndex === levels.length - 1;
        this.add.rectangle(480, 290, 460, 190, 0x10202a, 0.96);
        this.add.text(480, 260, `${last ? 'All levels complete!' : 'Level complete!'}\nCoins: ${this.score}/${this.totalCoins}`, {
            fontSize: '28px', align: 'center', color: '#ffffff'
        }).setOrigin(0.5);
        const next = this.add.text(480, 330, last ? 'Play Again' : 'Next Level', {
            fontSize: '24px', color: '#52d7bc', backgroundColor: '#243f4d', padding: { x: 18, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        next.on('pointerdown', () => this.transition({
            levelIndex: last ? 0 : this.levelIndex + 1,
            deaths: last ? 0 : this.deaths
        }));
    }

    transition(data) {
        if (this.restarting) return;
        this.restarting = true;
        this.physics.pause();
        this.scene.restart(data);
    }

    restartGame(fromDeath = false) {
        this.transition({
            levelIndex: this.levelIndex,
            deaths: this.deaths,
            checkpoint: fromDeath ? this.checkpoint : null,
            collected: fromDeath && this.checkpoint ? [...this.collected] : []
        });
    }

    die() {
        if (this.finished || this.restarting) return;
        this.deaths++;
        if (this.deaths >= 3) {
            this.restarting = true;
            this.finished = true;
            this.physics.pause();
            this.scene.start('MenuScene', { gameOver: true, reached: this.levelIndex + 1 });
            return;
        }
        this.restartGame(true);
    }

    update() {
        if (!this.keys || this.restarting) return;
        if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) { this.restartGame(); return; }
        if (this.finished) return;
        this.enemies.children.iterate(enemy => {
            const left = enemy.getData('left');
            const right = enemy.getData('right');
            const speed = 65 + this.levelIndex * 15;
            if (left === right) return;
            if (enemy.x >= right && enemy.body.velocity.x > 0) enemy.setVelocityX(-speed);
            else if (enemy.x <= left && enemy.body.velocity.x < 0) enemy.setVelocityX(speed);
            enemy.setFlipX(enemy.body.velocity.x < 0);
        });
        const left = this.keys.left.isDown || this.keys.a.isDown;
        const right = this.keys.right.isDown || this.keys.d.isDown;
        this.player.setVelocityX((Number(right) - Number(left)) * 220);
        if (Phaser.Input.Keyboard.JustDown(this.keys.jump) && this.player.body.blocked.down) {
            this.player.setVelocityY(-420);
            playEffect(this, 'jump');
        }
        if (this.player.y > 680) this.die();
    }
}
