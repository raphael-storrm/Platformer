const rows = Array.from({ length: 20 }, () => Array(30).fill('.'));
for (let x = 0; x < 30; x++) rows[19][x] = '#';
for (const [left, right, row] of [[4, 8, 16], [11, 15, 13], [18, 22, 16]]) {
    for (let x = left; x <= right; x++) rows[row][x] = '#';
}
for (const [x, y, symbol] of [
    [2, 18, 'P'], [6, 15, 'C'], [13, 12, 'C'], [20, 15, 'C'],
    [24, 18, 'C'], [27, 18, 'C'], [9, 18, 'S'], [17, 18, 'S'], [28, 18, 'F']
]) rows[y][x] = symbol;
export const levelData = rows.map(row => row.join(''));
