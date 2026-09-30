export function handleMovement(player) {
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                player.moveLeft();
                break;
            case 'd':
            case 'ArrowRight':
                player.moveRight();
                break;
            case ' ':
                player.jump();
                break;
        }
    });
}

export function handleKeyUp(player) {
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
            case 'd':
            case 'ArrowRight':
                player.resetMovement();
                break;
        }
    });
}