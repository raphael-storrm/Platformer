export class Hazard {
    position: { x: number; y: number };
    
    constructor(x: number, y: number) {
        this.position = { x, y };
    }

    checkCollision(playerPosition: { x: number; y: number }, playerSize: { width: number; height: number }): boolean {
        const hazardSize = { width: 32, height: 32 }; // Assuming a fixed size for hazards

        return (
            playerPosition.x < this.position.x + hazardSize.width &&
            playerPosition.x + playerSize.width > this.position.x &&
            playerPosition.y < this.position.y + hazardSize.height &&
            playerPosition.y + playerSize.height > this.position.y
        );
    }
}