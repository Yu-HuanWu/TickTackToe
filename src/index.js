const View = require('./ttt-view')
const Game = require('../ttt_node/game')

document.addEventListener("DOMContentLoaded", () => {
  const figures = document.getElementById('ttt');
  const game = new Game()
  const view = new View(game, figures)
});
