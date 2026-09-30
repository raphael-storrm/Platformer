const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speed: 5,
    score: 0
};

let coins = [];
let isGameOver = false;

function initGame() {
    createCoins();
    document.addEventListener('keydown', handleKeyPress);
    gameLoop();
}

function createCoins() {
    for (let i = 0; i < 5; i++) {
        coins.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 20,
            height: 20
        });
    }
}

function handleKeyPress(event) {
    if (isGameOver) return;

    switch (event.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
        case 'r':
            restartGame();
            break;
    }
    checkCollisions();
}

function checkCollisions() {
    coins = coins.filter(coin => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            player.score++;
            playCoinSound();
            return false; // Remove coin
        }
        return true; // Keep coin
    });

    if (player.score >= 5) {
        isGameOver = true;
        alert('You win! Score: ' + player.score);
    }
}

function playCoinSound() {
    const coinSound = new Audio('assets/sounds/coin.wav');
    coinSound.play();
}

function gameLoop() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCoins();
    requestAnimationFrame(gameLoop);
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
    ctx.fillStyle = 'gold';
    coins.forEach(coin => {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });
}

function restartGame() {
    player.score = 0;
    player.x = 50;
    player.y = 50;
    isGameOver = false;
    coins = [];
    createCoins();
    gameLoop();
}

window.onload = initGame;