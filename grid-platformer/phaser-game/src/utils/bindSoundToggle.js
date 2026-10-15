export function bindSoundToggle(scene) {
    const toggle = document.getElementById('sound-enabled');
    if (!toggle) return;
    const change = () => { scene.sound.mute = !toggle.checked; };
    change();
    toggle.addEventListener('change', change);
    scene.events.once('shutdown', () => toggle.removeEventListener('change', change));
}
