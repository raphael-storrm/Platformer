export type Vector2 = {
    x: number;
    y: number;
};

export interface Player {
    position: Vector2;
    velocity: Vector2;
    moveLeft(): void;
    moveRight(): void;
    jump(): void;
    reset(): void;
}

export interface Coin {
    position: Vector2;
    isCollected: boolean;
    collect(): void;
}

export interface Hazard {
    position: Vector2;
    checkCollision(player: Player): boolean;
}

export interface Flag {
    position: Vector2;
    checkReached(player: Player): boolean;
}