const effects = {
    jump: [[220, 440, 0.12]],
    coin: [[740, 990, 0.08], [990, 1320, 0.10]],
    win: [[523, 523, 0.12], [659, 659, 0.12], [784, 1046, 0.25]]
};

export function playEffect(scene, name) {
    const context = scene.sound.context;
    if (!context || context.state !== 'running' || scene.sound.mute) return;
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
            oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
            oscillator.start(time);
            oscillator.stop(time + duration);
            time += duration;
        }
    } catch (error) {
        console.warn('Sound effect unavailable:', error);
    }
}
