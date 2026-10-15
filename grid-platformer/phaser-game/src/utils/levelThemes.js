export const levelThemes = [
    { name: 'Meadow', sky: '#b9e6ed', tile: 0x425b44, edge: 0x83c85a, detail: 0x617b50, enemy: 0xdb6856, ink: '#153e37', accent: '#255d37' },
    { name: 'Crystal Cavern', sky: '#141c30', tile: 0x34485c, edge: 0x65d5cd, detail: 0x52738b, enemy: 0xe694c1, ink: '#edfaff', accent: '#85e7de' },
    { name: 'Sunset Summit', sky: '#edb09e', tile: 0x694e66, edge: 0xf6d4ac, detail: 0x94758b, enemy: 0x527b8c, ink: '#452e48', accent: '#59314d' }
];

export function drawLevelBackground(scene, index) {
    const theme = levelThemes[index];
    scene.cameras.main.setBackgroundColor(theme.sky);
    const backdrop = scene.add.graphics().setDepth(-10);
    if (index === 0) {
        backdrop.fillStyle(0x90c9b4);
        for (const [x, y, w] of [[-100, 470, 440], [240, 450, 520], [660, 470, 430]]) {
            backdrop.fillEllipse(x + w / 2, y + 110, w, 260);
        }
        backdrop.fillStyle(0x6ba08b);
        for (let x = 30; x < 960; x += 130) {
            backdrop.fillRect(x + 13, 485, 9, 125);
            backdrop.fillTriangle(x - 18, 530, x + 18, 420, x + 54, 530);
        }
        const clouds = scene.add.graphics().setDepth(-9);
        clouds.fillStyle(0xf0f9f3);
        for (const [x, y] of [[65, 145], [350, 235], [710, 125]]) {
            clouds.fillRect(x, y, 100, 16).fillRect(x + 20, y - 16, 56, 16);
        }
        scene.tweens.add({ targets: clouds, x: 24, duration: 9000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    } else if (index === 1) {
        backdrop.fillStyle(0x202d43);
        for (let x = 0; x < 960; x += 120) {
            backdrop.fillTriangle(x, 0, x + 90, 0, x + 45, 100 + (x % 180));
            backdrop.fillTriangle(x, 640, x + 120, 640, x + 60, 440 - (x % 90));
        }
        backdrop.fillStyle(0x2d4859);
        for (let x = 35; x < 960; x += 185) backdrop.fillRect(x, 190, 28, 420);
        backdrop.fillStyle(0x47788a);
        for (const [x, y] of [[80, 360], [280, 510], [575, 410], [835, 210]]) {
            backdrop.fillTriangle(x - 15, y + 45, x, y - 32, x + 15, y + 45);
            backdrop.fillRect(x - 2, y - 14, 4, 39);
        }
    } else {
        backdrop.fillStyle(0xffe1aa).fillRect(700, 110, 80, 80);
        backdrop.fillStyle(0xbd8294);
        for (const [x, peak] of [[-80, 230], [220, 170], [530, 270]]) {
            backdrop.fillTriangle(x, 640, x + 210, peak, x + 450, 640);
        }
        backdrop.fillStyle(0x8c6c89);
        for (const [x, peak] of [[-130, 410], [300, 340], [640, 380]]) {
            backdrop.fillTriangle(x, 640, x + 190, peak, x + 390, 640);
        }
        backdrop.fillStyle(0xf3d1c7).fillRect(90, 120, 180, 12).fillRect(430, 195, 130, 8);
    }
    return theme;
}
