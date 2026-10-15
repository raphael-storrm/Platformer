function makeLevel(platforms, objects) {
    const rows = Array.from({ length: 20 }, () => Array(30).fill('.'));
    for (let x = 0; x < 30; x++) rows[19][x] = '#';
    for (const [left, right, row] of platforms) {
        for (let x = left; x <= right; x++) rows[row][x] = '#';
    }
    for (const [x, y, symbol] of objects) rows[y][x] = symbol;
    return rows.map(row => row.join(''));
}

export const levels = [
    {
        name: 'First Steps',
        tiles: makeLevel([[4, 8, 16], [11, 15, 13], [18, 22, 16]], [
            [2, 18, 'P'], [6, 15, 'C'], [13, 12, 'C'], [20, 15, 'C'],
            [24, 18, 'C'], [27, 18, 'C'], [9, 18, 'S'], [17, 18, 'S'],
            [15, 18, 'K'], [28, 18, 'F']
        ])
    },
    {
        name: 'Up and Over',
        tiles: makeLevel([[4, 7, 16], [10, 13, 13], [16, 19, 10], [23, 27, 13]], [
            [2, 18, 'P'], [5, 15, 'C'], [11, 12, 'C'], [17, 9, 'C'],
            [25, 12, 'C'], [26, 18, 'C'], [8, 18, 'S'], [9, 18, 'S'],
            [20, 18, 'S'], [21, 18, 'S'], [18, 18, 'K'], [28, 18, 'F']
        ])
    },
    {
        name: 'The Final Climb',
        tiles: makeLevel([[3, 6, 16], [9, 12, 13], [15, 18, 10], [21, 24, 7], [26, 29, 10]], [
            [1, 18, 'P'], [4, 15, 'C'], [10, 12, 'C'], [16, 9, 'C'],
            [22, 6, 'C'], [27, 9, 'C'], [7, 18, 'S'], [8, 18, 'S'],
            [13, 18, 'S'], [14, 18, 'S'], [23, 18, 'S'], [24, 18, 'S'],
            [17, 9, 'K'], [28, 9, 'F']
        ])
    }
];

// Retain the original export for callers that need the introductory level.
export const levelData = levels[0].tiles;
