import { F } from "./functional.js";
import { Timer } from "./timer.js";

document.getElementById('controls').style = 'display: block';

const initialState = {
    counter: 0,
    tick: Timer().init(500),
    seconds: Timer().init(1000),
    fps: {
        framesCount: 0,
        frameRate: 0
    }
};

const increaseRate = ({ tick, tick: { interval } }) => ({ tick: Timer().setInterval(tick, interval / 1.2) });
const decreaseRate = ({ tick, tick: { interval } }) => ({ tick: Timer().setInterval(tick, interval * 1.2) });
const togglePause = ({ tick }) => ({ tick: Timer().togglePause(tick) });

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

F(initialState)
    .event(increaseRate, e => document.getElementById('increase_rate').onclick = e)
    .event(decreaseRate, e => document.getElementById('decrease_rate').onclick = e)
    .event(togglePause, e => document.getElementById('toggle_pause').onclick = e)
    .run(
        tickTimer,
        secondsTimer,
        calculateFrameRate,
        updateCounter,
        formatCounter,
        renderCounter
    );