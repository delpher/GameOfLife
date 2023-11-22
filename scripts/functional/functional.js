export const F = (initialState) => ({
    run: ((...program) =>
        window.setInterval(() => (initialState = F.pipe(initialState, program)), 0)
    ),
    event: function(handler, binder) { binder(() => initialState = F.doUpdate(initialState, handler)); return this; }
});

F.renderer = (renderLogic) =>
    (state => { renderLogic(state); return state; });

F.doUpdate = (state, update) =>
    typeof state === 'object'
        ? Object.assign({}, state, update(state))
        : update(state);

F.pipe = (initialState, updates) =>
    updates.reduce(F.doUpdate, initialState);