const cacheName = 'ONYX Create';
const staticAssets = [
    './',
    './index.html',
    './App.js',
    './config.json',
    './favicon.ico',
    './l10n.json',
    './maintenance.html',
    './manifest.webmanifest',
    './require-config.js',
    './styles.css',
    
    './Assets/Recorder/recorderWorker.js',
    
    './fonts/Dosis-200.eot',
    './fonts/Dosis-200.ttf',
    './fonts/Dosis-200.woff',
    './fonts/Dosis-200.woff2',
    './fonts/Dosis-regular.ttf',
    './fonts/Dosis-regular.woff',
    './fonts/Dosis-regular.woff2',
    './fonts/Merriweather-Sans-300italic.eot',
    './fonts/Merriweather-Sans-300italic.svg',
    './fonts/Merriweather-Sans-300italic.ttf',
    './fonts/Merriweather-Sans-300italic.woff',
    './fonts/Merriweather-Sans-300italic.woff2',
    
    './lib/etch/dist/etch.js',
    './lib/exjs/dist/ex.js',
    './lib/exjs/dist/ex.js.map',
    './lib/ext/jquery.min.js',
    './lib/ext/sdk-3.1.2.js',
    './lib/ext/webfontloader.js',
    './lib/extensions/dist/extensions.js',
    './lib/intersection/intersection.js',
    './lib/key-codes/dist/key-codes.js',
    './lib/lzma/src/lzma.js',
    './lib/lzma/src/lzma_worker.js',
    './lib/minerva/dist/minerva.js',
    './lib/minerva/dist/minerva.js.map',
    './lib/nullstone/dist/nullstone.min.js',
    './lib/nullstone/dist/nullstone.min.js.map',
    './lib/pixelpalette/dist/PixelPalette.js',
    './lib/RecorderJS/recorder.js',
    './lib/text/text.js',
    './lib/tone/build/p5.Tone.js',
    './lib/tone/build/p5.Tone.min.js',
    './lib/tone/build/Tone.js',
    './lib/tone/build/Tone.min.js',
    './lib/tone/gulp/gulpfile.js',
    './lib/tone/gulp/package.json',
    './lib/tone/gulp/fragments/after.frag',
    './lib/tone/gulp/fragments/before.frag',
    './lib/tone/gulp/fragments/p5-after.frag',
    './lib/tone/gulp/fragments/test.frag',
    './lib/tone/Tone/component/AmplitudeEnvelope.js',
    './lib/tone/Tone/component/Analyser.js',
    './lib/tone/Tone/component/Compressor.js',
    './lib/tone/Tone/component/CrossFade.js',
    './lib/tone/Tone/component/Envelope.js',
    './lib/tone/Tone/component/EQ3.js',
    './lib/tone/Tone/component/EQMultiband.js',
    './lib/tone/Tone/component/FeedbackCombFilter.js',
    './lib/tone/Tone/component/Filter.js',
    './lib/tone/Tone/component/Follower.js',
    './lib/tone/Tone/component/FrequencyEnvelope.js',
    './lib/tone/Tone/component/Gate.js',
    './lib/tone/Tone/component/LFO.js',
    './lib/tone/Tone/component/Limiter.js',
    './lib/tone/Tone/component/LowpassCombFilter.js',
    './lib/tone/Tone/component/Merge.js',
    './lib/tone/Tone/component/Meter.js',
    './lib/tone/Tone/component/MidSideCompressor.js',
    './lib/tone/Tone/component/MultibandSplit.js',
    './lib/tone/Tone/component/Panner.js',
    './lib/tone/Tone/component/PanVol.js',
    './lib/tone/Tone/component/ScaledEnvelope.js',
    './lib/tone/Tone/component/SimpleEnvelope.js',
    './lib/tone/Tone/component/Split.js',
    './lib/tone/Tone/component/Volume.js',
    './lib/tone/Tone/control/CtrlInterpolate.js',
    './lib/tone/Tone/control/CtrlMarkov.js',
    './lib/tone/Tone/control/CtrlPattern.js',
    './lib/tone/Tone/control/CtrlRandom.js',
    './lib/tone/Tone/core/Buffer.js',
     './lib/tone/Tone/core/Bus.js',
     './lib/tone/Tone/core/Clock.js',
     './lib/tone/Tone/core/Delay.js',
     './lib/tone/Tone/core/Emitter.js',
     './lib/tone/Tone/core/Gain.js',
     './lib/tone/Tone/core/IntervalTimeline.js',
     './lib/tone/Tone/core/Master.js',
     './lib/tone/Tone/core/Note.js',
     './lib/tone/Tone/core/Param.js',
     './lib/tone/Tone/core/Timeline.js',
     './lib/tone/Tone/core/TimelineState.js',
     './lib/tone/Tone/core/Tone.js',
     './lib/tone/Tone/core/Transport.js',
     './lib/tone/Tone/core/Type.js',
    './lib/tone/Tone/effect/AutoFilter.js',
    './lib/tone/Tone/effect/AutoPanner.js',
    './lib/tone/Tone/effect/AutoWah.js',
    './lib/tone/Tone/effect/BitCrusher.js',
    './lib/tone/Tone/effect/Chebyshev.js',
    './lib/tone/Tone/effect/Chorus.js',
    './lib/tone/Tone/effect/Convolver.js',
    './lib/tone/Tone/effect/Distortion.js',
    './lib/tone/Tone/effect/Effect.js',
    './lib/tone/Tone/effect/FeedbackDelay.js',
    './lib/tone/Tone/effect/FeedbackEffect.js',
    './lib/tone/Tone/effect/Freeverb.js',
    './lib/tone/Tone/effect/JCReverb.js',
    './lib/tone/Tone/effect/MidSideEffect.js',
    './lib/tone/Tone/effect/Phaser.js',
    './lib/tone/Tone/effect/PingPongDelay.js',
    './lib/tone/Tone/effect/PitchShift.js',
    './lib/tone/Tone/effect/StereoEffect.js',
    './lib/tone/Tone/effect/StereoFeedbackEffect.js',
    './lib/tone/Tone/effect/StereoWidener.js',
    './lib/tone/Tone/effect/StereoXFeedbackEffect.js',
    './lib/tone/Tone/effect/Tremolo.js',
    './lib/tone/Tone/effect/Vibrato.js',
    './lib/tone/Tone/event/Event.js',
    './lib/tone/Tone/event/Loop.js',
    './lib/tone/Tone/event/Part.js',
    './lib/tone/Tone/event/Pattern.js',
    './lib/tone/Tone/event/Sequence.js',
    './lib/tone/Tone/instrument/AMSynth.js',
    './lib/tone/Tone/instrument/DrumSynth.js',
    './lib/tone/Tone/instrument/DuoSynth.js',
    './lib/tone/Tone/instrument/FMSynth.js',
    './lib/tone/Tone/instrument/Instrument.js',
    './lib/tone/Tone/instrument/Monophonic.js',
    './lib/tone/Tone/instrument/MonoSynth.js',
    './lib/tone/Tone/instrument/NoiseSynth.js',
    './lib/tone/Tone/instrument/PluckSynth.js',
    './lib/tone/Tone/instrument/PolySynth.js',
    './lib/tone/Tone/instrument/Sampler.js',
    './lib/tone/Tone/instrument/SimpleAM.js',
    './lib/tone/Tone/instrument/SimpleFM.js',
    './lib/tone/Tone/instrument/Simpler.js',
    './lib/tone/Tone/instrument/SimpleSynth.js',
    './lib/tone/Tone/signal/Abs.js',
     './lib/tone/Tone/signal/Add.js',
     './lib/tone/Tone/signal/AND.js',
     './lib/tone/Tone/signal/AudioToGrain.js',
     './lib/tone/Tone/signal/Clip.js',
     './lib/tone/Tone/signal/Equal.js',
     './lib/tone/Tone/signal/EqualPowerGain.js',
     './lib/tone/Tone/signal/EqualZero.js',
     './lib/tone/Tone/signal/Expr.js',
     './lib/tone/Tone/signal/GainToAudio.js',
     './lib/tone/Tone/signal/GreaterThan.js',
     './lib/tone/Tone/signal/GreaterThanZero.js',
     './lib/tone/Tone/signal/IfThenElse.js',
     './lib/tone/Tone/signal/LessThan.js',
     './lib/tone/Tone/signal/Max.js',
     './lib/tone/Tone/signal/Min.js',
     './lib/tone/Tone/signal/Modulo.js',
     './lib/tone/Tone/signal/Multiply.js',
     './lib/tone/Tone/signal/Negate.js',
     './lib/tone/Tone/signal/Normalize.js',
     './lib/tone/Tone/signal/NOT.js',
     './lib/tone/Tone/signal/OR.js',
     './lib/tone/Tone/signal/Pow.js',
     './lib/tone/Tone/signal/Route.js',
     './lib/tone/Tone/signal/Scale.js',
     './lib/tone/Tone/signal/ScaleExp.js',
     './lib/tone/Tone/signal/Select.js',
     './lib/tone/Tone/signal/Signal.js',
     './lib/tone/Tone/signal/SignalBase.js',
     './lib/tone/Tone/signal/Subtract.js',
     './lib/tone/Tone/signal/Switch.js',
     './lib/tone/Tone/signal/TimelineSignal.js',
     './lib/tone/Tone/signal/WaveShaper.js',
    './lib/tone/Tone/source/ExternalInput.js',
    './lib/tone/Tone/source/Microphone.js',
    './lib/tone/Tone/source/Noise.js',
    './lib/tone/Tone/source/OmniOscillator.js',
    './lib/tone/Tone/source/Oscillator.js',
    './lib/tone/Tone/source/Player.js',
    './lib/tone/Tone/source/PulseOscillator.js',
    './lib/tone/Tone/source/PWMOscillator.js',
    './lib/tone/Tone/source/SimplePlayer.js',
    './lib/tone/Tone/source/SimpleSource.js',
    './lib/tone/Tone/source/Source.js',
    './lib/utils/TypeScript/Tone.d.ts',
    './lib/tweenjs/src/Tween.js',
    './lib/utils/dist/utils.js',
    
    './img/modesterio.gif',
    './img/palette9.gif',
    './img/palette10.gif',
    './img/palette14.gif',
    './img/palette18.gif',
    './img/palette25.gif',
    './img/palette27.gif',
    './img/riki.gif',
    './img/palette28.gif',
    './img/seacucumber.gif',
    './img/palette29.gif',
    './img/palette.gif',
    './img/experiment.gif',
    './img/experiment2.gif',
    './img/ikko.gif',
    './img/ikko2.gif',
    './img/ikko3.gif',
    './img/ikko4.gif',
    
    './Workers/WaveWorker.js'
    
];
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
//    return self.skipWaiting();
});

self.addEventListener('activate', e => {
//    self.cliets.claim();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);
    
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached;
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}






























