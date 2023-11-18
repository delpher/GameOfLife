(function(global) {
    global.F = (initialState) => ({
        run: ((...program) =>
            window.setInterval(() => (initialState = global.F.pipe(initialState, program)), 0)
        ),
        update: update => initialState = global.F.doUpdate(initialState, update)
    });

    global.F.renderer = (renderLogic) =>
        (state => { renderLogic(state); return state; });

    global.F.doUpdate = (state, update) =>
        typeof state === 'object'
            ? Object.assign({}, state, update(state))
            : update(state);

    global.F.pipe = (initialState, updates) =>
        updates.reduce(global.F.doUpdate, initialState);

}(typeof window !== "undefined" ? window : global));