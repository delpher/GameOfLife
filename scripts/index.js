const version = new URLSearchParams(document.location.search).get('version') || 'functional';
if (version == 'functional') {
    console.log('STARTING FUNCTIONAL VERSION');
    import('./functional/game.js');
}
else {
    console.log('STARTING OO VERSION');
    import('./oo/game.js');
}
