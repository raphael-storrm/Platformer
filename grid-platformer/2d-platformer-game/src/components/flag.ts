export class Flag {
    position: { x: number; y: number };
    isReached: boolean;

    constructor(x: number, y: number) {
        this.position = { x, y };
        this.isReached = false;
    }

    checkIfReached(playerPosition: { x: number; y: number }): boolean {
        const reached = playerPosition.x === this.position.x && playerPosition.y === this.position.y;
        this.isReached = reached;
        return reached;
    }

    displayCoinCount(coinCount: number): void {
        console.log(`Coins collected: ${coinCount}`);
    }

    displayReplayButton(): void {
        console.log("Press R to replay the level.");
    }
}