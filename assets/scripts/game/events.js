const api = require('./api')
const ui = require('./ui')

const onCreateGame = function (event) {
  event.preventDefault()

  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onUpdateGame = function (event) {
  api.updateGame()
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
}

const onShowGame = function (event) {
  event.preventDefault()
  api.index()
    .then(ui.showGameSuccess)
    .catch(ui.showGameFailure)
}

module.exports = {
  onCreateGame,
  onUpdateGame,
  onShowGame
}
