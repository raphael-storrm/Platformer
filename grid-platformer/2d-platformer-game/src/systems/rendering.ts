export function renderPlayer(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.drawImage(player.sprite, player.position.x, player.position.y);
}

export function renderCoins(ctx: CanvasRenderingContext2D, coins: Coin[]) {
    coins.forEach(coin => {
        if (!coin.isCollected) {
            ctx.drawImage(coin.sprite, coin.position.x, coin.position.y);
        }
    });
}

export function renderHazards(ctx: CanvasRenderingContext2D, hazards: Hazard[]) {
    hazards.forEach(hazard => {
        ctx.drawImage(hazard.sprite, hazard.position.x, hazard.position.y);
    });
}

export function renderFlag(ctx: CanvasRenderingContext2D, flag: Flag) {
    ctx.drawImage(flag.sprite, flag.position.x, flag.position.y);
}

export function renderGame(ctx: CanvasRenderingContext2D, player: Player, coins: Coin[], hazards: Hazard[], flag: Flag) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderPlayer(ctx, player);
    renderCoins(ctx, coins);
    renderHazards(ctx, hazards);
    renderFlag(ctx, flag);
}