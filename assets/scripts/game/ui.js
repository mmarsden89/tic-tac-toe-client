const store = require('../store')
const events = require('./events')

const createGameSuccess = function (data) {
  console.log('createGameSuccess')
  store.game = data.game
  console.log('new game success with: ', data)
  console.log('store')
  console.log(store)
  events.onShowGame()
}

const createGameFailure = function (data) {
  console.log('new game failed with: ', data)
}

const updateGameSuccess = function (data) {
  console.log('update successful: ', data)
}

const updateGameFailure = function (data) {
  console.log('update failed: ', data)
}

const showGameSuccess = function (data) {
  console.log(data)
  store.userGames = JSON.stringify(data.games, ['id', 'cells', 'over', 'player_x'])
  store.userGamesLength = data.games.length
  console.log(store.userGamesLength)
  console.log(store.userGames)
  console.log('success, length of games is: ' + data.games.length)
}

const showGameFailure = function (data) {
  console.log('game load failure ', data)
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showGameSuccess,
  showGameFailure
}
