const effects = {
    jump: [[220, 440, 0.12]],
    coin: [[740, 990, 0.08], [990, 1320, 0.10]],
    death: [[260, 90, 0.18]],
    stageWin: [[523, 523, 0.12], [659, 659, 0.12], [784, 1046, 0.25]],
    gameWin: [
        [523, 523, 0.15], [659, 659, 0.15], [784, 784, 0.15],
        [1046, 1046, 0.3], [880, 880, 0.15], [988, 988, 0.15], [1046, 1046, 0.5]
    ],
    gameOver: [[392, 330, 0.22], [330, 262, 0.22], [262, 196, 0.28], [196, 131, 0.5]]
};

export function playEffect(scene, name) {
    const context = scene.sound.context;
    if (!context || context.state !== 'running' || scene.sound.mute) return;
    const active = new Set();
    const stop = () => {
        scene.events.off('shutdown', stop);
        for (const { oscillator, gain } of active) {
            oscillator.stop();
            oscillator.disconnect();
            gain.disconnect();
        }
        active.clear();
    };
    scene.events.once('shutdown', stop);
    try {
        let time = context.currentTime;
        for (const [start, end, duration] of effects[name] || []) {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(start, time);
            oscillator.frequency.exponentialRampToValueAtTime(end, time + duration);
            gain.gain.setValueAtTime(0.0001, time);
            gain.gain.exponentialRampToValueAtTime(0.12, time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
            oscillator.connect(gain);
            gain.connect(scene.sound.destination || context.destination);
            const node = { oscillator, gain };
            active.add(node);
            oscillator.onended = () => {
                oscillator.disconnect();
                gain.disconnect();
                active.delete(node);
                if (active.size === 0) scene.events.off('shutdown', stop);
            };
            oscillator.start(time);
            oscillator.stop(time + duration);
            time += duration;
        }
    } catch (error) {
        stop();
        console.warn('Sound effect unavailable:', error);
    }
    if (active.size === 0) scene.events.off('shutdown', stop);
}
