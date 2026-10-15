export const musicTracks = [
    { name: 'Meadow Walk', voice: 'flute', beat: 0.48,
        melody: [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 83, 81, 77, 74, 72],
        roots: [48, 48, 53, 53, 48, 48, 55, 55] },
    { name: 'Crystal Echoes', voice: 'crystal', beat: 0.82,
        melody: [69, 76, 81, 79, 76, 72, 71, 76, 67, 74, 79, 77, 74, 71, 69, 64],
        roots: [45, 45, 48, 48, 43, 43, 40, 40] },
    { name: 'Summit Glow', voice: 'warm', beat: 0.68,
        melody: [62, 66, 69, 73, 71, 69, 66, 64, 59, 62, 66, 69, 68, 66, 64, 62],
        roots: [38, 38, 43, 43, 47, 47, 45, 45] },
    { name: 'Cloud Waltz', voice: 'air', beat: 0.76,
        melody: [84, 88, 91, 88, 86, 89, 93, 89, 83, 86, 91, 86, 81, 84, 88, 84],
        roots: [48, 48, 53, 53, 55, 55, 57, 57] },
    { name: 'Candy Carousel', voice: 'toy', beat: 0.36,
        melody: [72, 79, 76, 79, 77, 81, 74, 77, 76, 79, 84, 83, 81, 77, 74, 79],
        roots: [48, 48, 53, 55, 48, 48, 53, 55] }
];
const buffers = new WeakMap();

function createLoop(context, index) {
    let cache = buffers.get(context);
    if (!cache) { cache = new Map(); buffers.set(context, cache); }
    if (cache.has(index)) return cache.get(index);
    const track = musicTracks[index];
    const beat = track.beat;
    const duration = beat * 32;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    const note = (midi, start, length, volume, voice = 'bass') => {
        const frequency = 440 * 2 ** ((midi - 69) / 12);
        const first = Math.floor(start * context.sampleRate);
        const count = Math.floor(length * context.sampleRate);
        for (let i = 0; i < count && first + i < samples.length; i++) {
            const t = i / context.sampleRate;
            const phase = 2 * Math.PI * frequency * t;
            const envelope = Math.min(1, t / 0.025) * Math.min(1, (length - t) / 0.14);
            let wave = Math.sin(phase);
            if (voice === 'flute') wave += 0.14 * Math.sin(phase * 2);
            if (voice === 'crystal') wave = (wave + 0.3 * Math.sin(phase * 2.76)) * Math.exp(-t * 2.2);
            if (voice === 'warm') wave += 0.18 * Math.sin(phase * 3) / 3;
            if (voice === 'air') wave = (wave + 0.15 * Math.sin(phase * 2)) * Math.exp(-t * 1.2);
            if (voice === 'toy') wave = (wave + 0.3 * Math.sin(phase * 3) + 0.1 * Math.sin(phase * 5)) * Math.exp(-t * 5);
            samples[first + i] += wave * envelope * volume;
        }
    };
    track.melody.forEach((pitch, step) => {
        const length = track.voice === 'toy' ? beat * 0.8 : beat * 1.8;
        note(pitch, step * beat * 2, length, 0.09, track.voice);
        if (track.voice === 'crystal') note(pitch, step * beat * 2 + beat * 0.6, beat, 0.025, 'crystal');
        if (track.voice === 'toy') note(pitch + 12, step * beat * 2 + beat, beat * 0.7, 0.035, 'toy');
    });
    for (let bar = 0; bar < 8; bar++) {
        const root = track.roots[bar];
        if (track.voice === 'toy' || track.voice === 'flute') {
            for (let pulse = 0; pulse < 4; pulse++) {
                note(root + (pulse % 2 ? 7 : 0), (bar * 4 + pulse) * beat, beat * 0.65, 0.04);
            }
        } else {
            note(root, bar * beat * 4, beat * 3.8, 0.045);
            note(root + 7, bar * beat * 4, beat * 3.8, 0.02);
        }
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
