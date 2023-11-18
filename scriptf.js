const initialState = {
    counter: 0,
    tick: Timer().init(500),
    seconds: Timer().init(1000),
    fps: {
        framesCount: 0,
        frameRate: 0
    }
};

const tickTimer = ({ tick }) => ({ tick: Timer().run(tick) });

const secondsTimer = ({ seconds }) => ({ seconds: Timer().run(seconds) });

const calculateFrameRate = ({ seconds: { tick }, fps: { framesCount, frameRate } }) => ({
    fps: {
        framesCount: tick ? 0 : framesCount + 1,
        frameRate: tick ? framesCount : frameRate,
    }
});

const updateCounter = ({ counter, tick: { tick } }) => ({ counter: tick ? counter + 1 : counter });

const formatCounter = ({ counter, tick: { interval }, fps: { frameRate } }) => ({
    counterLabel: `TICKS: ${counter}@${(1000 / interval).toFixed(2)}tps,\r\nFPS: ${frameRate}`
});

const renderCounter = F.renderer(({ counterLabel }) => { document.getElementById('display').innerText = counterLabel; });

const program = F(initialState);

const increaseRate = () => program.update(
    ({ tick, tick: { interval } }) => ({ tick: Timer().setInterval(tick, interval / 1.2) })
);

const decreaseRate = () => program.update(
    ({ tick, tick: { interval } }) => ({ tick: Timer().setInterval(tick, interval * 1.2) })
);

const togglePause = () => program.update(
    ({ tick }) => ({ tick: Timer().togglePause(tick) })
);

program.run(
    tickTimer,
    secondsTimer,
    calculateFrameRate,
    updateCounter,
    formatCounter,
    renderCounter
);