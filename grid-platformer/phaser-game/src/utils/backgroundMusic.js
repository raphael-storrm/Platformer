const patterns = [
    [60, 64, 67, 71, 67, 64, 62, 64, 60, 64, 69, 67, 64, 62, 59, 62],
    [57, 64, 69, 71, 69, 64, 60, 64, 55, 62, 67, 69, 67, 62, 59, 62],
    [62, 66, 69, 73, 69, 66, 64, 66, 59, 62, 66, 69, 66, 64, 61, 64]
];
const buffers = new WeakMap();

function createLoop(context, index) {
    let cache = buffers.get(context);
    if (!cache) { cache = new Map(); buffers.set(context, cache); }
    if (cache.has(index)) return cache.get(index);
    const beat = 0.65;
    const duration = beat * 32;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    const note = (midi, start, length, volume) => {
        const frequency = 440 * 2 ** ((midi - 69) / 12);
        const first = Math.floor(start * context.sampleRate);
        const count = Math.floor(length * context.sampleRate);
        for (let i = 0; i < count && first + i < samples.length; i++) {
            const t = i / context.sampleRate;
            const envelope = Math.min(1, t / 0.05) * Math.min(1, (length - t) / 0.18);
            samples[first + i] += Math.sin(2 * Math.PI * frequency * t) * envelope * volume;
        }
    };
    patterns[index].forEach((pitch, step) => note(pitch, step * beat * 2, beat * 1.7, 0.09));
    for (let bar = 0; bar < 8; bar++) {
        const root = patterns[index][bar * 2] - 24;
        note(root, bar * beat * 4, beat * 3.8, 0.045);
        note(root + 7, bar * beat * 4, beat * 3.8, 0.02);
    }
    cache.set(index, buffer);
    return buffer;
}

export function startBackgroundMusic(scene, index) {
    const context = scene.sound.context;
    if (!context) return () => {};
    let source;
    let gain;
    let stopped = false;
    const start = () => {
        if (stopped || source || context.state !== 'running') return;
        try {
            source = context.createBufferSource();
            source.buffer = createLoop(context, index);
            source.loop = true;
            gain = context.createGain();
            gain.gain.setValueAtTime(0, context.currentTime);
            gain.gain.linearRampToValueAtTime(0.22, context.currentTime + 0.7);
            source.connect(gain);
            gain.connect(scene.sound.destination || context.destination);
            source.start();
        } catch (error) {
            if (source) { source.disconnect(); source = null; }
            if (gain) { gain.disconnect(); gain = null; }
            stopped = true;
            console.warn('Background music unavailable:', error);
        }
    };
    const retry = scene.time.addEvent({ delay: 250, loop: true, callback: start });
    scene.sound.on('unlocked', start);
    start();
    const stop = () => {
        stopped = true;
        retry.remove();
        scene.sound.off('unlocked', start);
        if (source) { source.stop(); source.disconnect(); source = null; }
        if (gain) { gain.disconnect(); gain = null; }
    };
    scene.events.once('shutdown', stop);
    return stop;
}
