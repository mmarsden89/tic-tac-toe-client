const store = require('../store')

const createGameSuccess = function (data) {
  console.log('createGameSuccess')
  store.game = data.game
  console.log('new game success with: ', data)
  console.log('store')
  console.log(store)
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
  console.log('game load succesful ', data)
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
