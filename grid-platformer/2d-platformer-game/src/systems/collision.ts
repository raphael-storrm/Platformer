export function checkCollision(player, gameObjects) {
    for (const obj of gameObjects) {
        if (isColliding(player, obj)) {
            if (obj instanceof Coin) {
                obj.collect();
            } else if (obj instanceof Hazard) {
                player.reset();
            } else if (obj instanceof Flag) {
                // Handle reaching the finish flag
                console.log("You've reached the finish!");
            }
        }
    }
}

function isColliding(player, obj) {
    return (
        player.position.x < obj.position.x + obj.width &&
        player.position.x + player.width > obj.position.x &&
        player.position.y < obj.position.y + obj.height &&
        player.position.y + player.height > obj.position.y
    );
}