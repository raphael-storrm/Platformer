export function validateLevel(rows, width, height) {
    if (!Array.isArray(rows) || rows.length !== height) {
        throw new Error(`Level must have ${height} rows.`);
    }
    let spawns = 0;
    rows.forEach((row, y) => {
        if (typeof row !== 'string' || row.length !== width) {
            throw new Error(`Level row ${y + 1} must have ${width} tiles.`);
        }
        for (const symbol of row) {
            if (!'#PCS F.'.replace(' ', '').includes(symbol)) {
                throw new Error(`Unknown level symbol ${JSON.stringify(symbol)} in row ${y + 1}.`);
            }
            if (symbol === 'P') spawns++;
        }
    });
    if (spawns !== 1) throw new Error(`Level must have exactly one player spawn (P); found ${spawns}.`);
}
