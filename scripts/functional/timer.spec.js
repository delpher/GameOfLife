import { Timer } from './timer.js';

jest.useFakeTimers();

const RealDate = Date.now;
const dateStart = new Date('2019-04-07T10:20:30Z');
const dateTick = new Date(dateStart.getTime() + 500);

describe('Timer', () => {

    beforeEach(() => {
        setCurrentDate(dateStart);
    });

    afterEach(() => {
        global.Date.now = RealDate;
    });

    test('should initialize state', () => {
        expect(Timer().init(500))
            .toStrictEqual({
                time: dateStart.getTime(),
                interval: 500,
                tick: false,
                paused: false
            });
    });

    test('should tick', () => {
        const state = Timer().init(500);
        setCurrentDate(dateTick);
        expect(Timer().run(state))
            .toStrictEqual({
                time: dateTick.getTime(),
                interval: 500,
                tick: true,
                paused: false
            });
    });

    test('should set interval', () => {
        const state = Timer().init(500);
        expect(Timer().setInterval(state, 100))
            .toHaveProperty("interval", 100);
    });

    test('should pause', () => {
        let state = Timer().init(500);
        setCurrentDate(dateTick);
        state = Timer().togglePause(state);
        expect(Timer().run(state))
            .toStrictEqual({
                time: dateStart.getTime(),
                interval: 500,
                tick: false,
                paused: true
            });
    });

    test('should resume', () => {
        let state = Timer().init(500);
        setCurrentDate(dateTick);
        state = Timer().togglePause(state);
        state = Timer().togglePause(state);
        expect(Timer().run(state))
            .toStrictEqual({
                time: dateTick.getTime(),
                interval: 500,
                tick: true,
                paused: false
            });
    })
});

function setCurrentDate(date) {
    global.Date.now = jest.fn(() => date.getTime());
}