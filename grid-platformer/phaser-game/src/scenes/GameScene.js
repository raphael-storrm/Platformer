import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('coin', 'assets/textures/coin.png');
        this.load.image('spike', 'assets/textures/spike.png');
        this.load.image('flag', 'assets/textures/flag.png');
        this.load.tilemapTiledJSON('level', 'assets/level.json');
        this.load.spritesheet('tiles', 'assets/textures/tiles.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        const map = this.make.tilemap({ key: 'level' });
        const tileset = map.addTilesetImage('tiles');

        const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
        layer.setCollisionByExclusion([-1]);

        this.physics.add.staticGroup({
            key: 'tiles',
            frame: [0, 1, 2, 3], // Assuming these are the indices for solid tiles
            collide: layer
        });

        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coins.children.iterate((coin) => {
            coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.spikes = this.physics.add.staticGroup();
        this.spikes.create(400, 568, 'spike').setScale(1).refreshBody();

        this.physics.add.overlap(this.player, this.spikes, this.hitSpike, null, this);

        this.flag = this.physics.add.staticGroup();
        this.flag.create(700, 500, 'flag');

        this.physics.add.overlap(this.player, this.flag, this.winGame, null, this);
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
    }

    hitSpike(player, spike) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }

    winGame(player, flag) {
        this.physics.pause();
        // Logic for winning the game
    }

    update() {
        // Update logic for player movement and game state
    }
}

export default GameScene;