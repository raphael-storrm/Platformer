export const characters = [
    { id: 'unicorn', name: 'Unicorn', color: 0xddb5f4 },
    { id: 'leprechaun', name: 'Leprechaun', color: 0x82d594 },
    { id: 'skeleton', name: 'Skeleton', color: 0xf4e9cd }
];

export function drawCharacter(graphics, id, frame = 0) {
    const rect = (color, x, y, w, h) => graphics.fillStyle(color).fillRect(x, y, w, h);
    const step = frame ? 2 : 0;
    if (id === 'unicorn') {
        rect(0x745383, 4, 15, 23, 11);
        rect(0xf6edf9, 6, 16, 19, 9);
        rect(0x745383, 18, 7, 12, 14);
        rect(0xf6edf9, 20, 8, 10, 11);
        rect(0xf6edf9, 24, 5, 3, 5);
        rect(0xffd451, 22, 1, 3, 7);
        rect(0xc27cce, 17, 9, 4, 13);
        rect(0x73cbd5, 15, 13, 4, 10);
        rect(0xc27cce, 1, 15, 5, 11);
        rect(0x73cbd5, 1, 22, 3, 5);
        rect(0xf6edf9, 8, 24, 4, 7 - step);
        rect(0xf6edf9, 20, 24, 4, 5 + step);
        rect(0x745383, 8, 29 - step, 4, 3);
        rect(0x745383, 20, 27 + step, 4, 3);
        rect(0x253747, 26, 10, 2, 3);
        rect(0xeaa9c0, 27, 16, 3, 2);
    } else if (id === 'leprechaun') {
        rect(0x183c35, 7, 0, 18, 9);
        rect(0x43a76b, 9, 1, 14, 7);
        rect(0x183c35, 4, 8, 24, 3);
        rect(0x172f36, 9, 5, 14, 3);
        rect(0xffd451, 14, 5, 4, 3);
        rect(0xf1bd8b, 9, 11, 14, 9);
        rect(0xc46638, 7, 16, 18, 6);
        rect(0xf1bd8b, 12, 16, 8, 3);
        rect(0x253747, 11, 12, 2, 2);
        rect(0x253747, 19, 12, 2, 2);
        rect(0x286744, 7, 21, 18, 7);
        rect(0x43a76b, 10, 21, 12, 5);
        rect(0xf1bd8b, 4, 22, 3, 5);
        rect(0xf1bd8b, 25, 22, 3, 5);
        rect(0x172f36, 9, 25, 14, 2);
        rect(0xffd451, 14, 25, 4, 3);
        rect(0x172f36, 7, 28 - step, 7, 4);
        rect(0x172f36, 19, 26 + step, 7, 4);
    } else {
        rect(0x596474, 7, 1, 18, 13);
        rect(0xf4edda, 8, 2, 16, 11);
        rect(0x253747, 10, 6, 4, 4);
        rect(0x253747, 18, 6, 4, 4);
        rect(0x253747, 15, 10, 2, 2);
        rect(0xf4edda, 11, 13, 10, 2);
        rect(0xf4edda, 15, 15, 2, 12);
        for (let y = 17; y < 24; y += 3) rect(0xf4edda, 10, y, 12, 1);
        rect(0xf4edda, 6, 17, 3, 10);
        rect(0xf4edda, 23, 17, 3, 10);
        rect(0xf4edda, 10, 26, 12, 2);
        rect(0xf4edda, 10, 28 - step, 3, 4);
        rect(0xf4edda, 19, 26 + step, 3, 4);
        rect(0xf4edda, 8, 30 - step, 5, 2);
        rect(0xf4edda, 19, 28 + step, 5, 2);
    }
}
