export function showGameError(scene, message) {
    scene.physics.pause();
    scene.cameras.main.setBackgroundColor('#182b35');
    scene.add.text(scene.scale.width / 2, scene.scale.height / 2,
        `Unable to start game\n\n${message}\n\nFix the problem and reload the page.`, {
            fontSize: '22px', color: '#ffffff', align: 'center',
            wordWrap: { width: Math.min(600, scene.scale.width - 40) }
        }).setOrigin(0.5);
}
