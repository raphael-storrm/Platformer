class Player {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    gravity: number;
    jumpStrength: number;
    isJumping: boolean;

    constructor(startX: number, startY: number) {
        this.position = { x: startX, y: startY };
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.isJumping = false;
    }

    moveLeft() {
        this.velocity.x = -5;
    }

    moveRight() {
        this.velocity.x = 5;
    }

    jump() {
        if (!this.isJumping) {
            this.velocity.y = this.jumpStrength;
            this.isJumping = true;
        }
    }

    reset() {
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.isJumping = false;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Apply gravity
        this.velocity.y += this.gravity;

        // Simple ground collision
        if (this.position.y >= 400) { // Assuming ground level is at y = 400
            this.position.y = 400;
            this.velocity.y = 0;
            this.isJumping = false;
        }
    }
}

export default Player;