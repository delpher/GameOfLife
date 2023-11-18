(function(global) {

    const F = typeof window !== 'undefined' ? window.F : global.F;

    global.Timer = function() {
        return {

            init: interval => ({ time: Date.now(), interval, tick: false, paused: false }),

            run: state => F.pipe(state, [
                ({ time, interval, paused }) => ({ tick: !paused && Date.now() - time >= interval }),
                ({ tick, time }) => ({ time: tick ? Date.now() : time })
            ]),

            togglePause: state =>
                F.doUpdate(state, ({ paused }) => ({ paused: !paused })),

            setInterval: (state, newInterval) =>
                F.doUpdate(state, () => ({ ...state, interval: newInterval }))
        }
    };

}(typeof window !== "undefined" ? window : global));