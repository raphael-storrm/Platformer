export class Coin {
    position: { x: number; y: number };
    isCollected: boolean;

    constructor(x: number, y: number) {
        this.position = { x, y };
        this.isCollected = false;
    }

    collect() {
        this.isCollected = true;
    }
}