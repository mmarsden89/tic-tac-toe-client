const store = require('../store')

let gameHasBeenRun = false

const createGameSuccess = function (data) {
  store.game = data.game
  gameHasBeenRun = true
  $('#displayMessage').text('')
}

const createGameFailure = function (data) {
}

const updateGameSuccess = function (data) {
}

const updateGameFailure = function (data) {
}

const updateComputerSuccess = function (data) {
}

const updateComputerFailure = function (data) {
}

const showGameSuccess = function (data) {
  store.userGames = JSON.stringify(data.games, ['id', 'cells', 'over', 'player_x'])
  store.userGamesLength = data.games.length
}

const showGameFailure = function (data) {
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showGameSuccess,
  showGameFailure,
  gameHasBeenRun,
  updateComputerSuccess,
  updateComputerFailure
}
