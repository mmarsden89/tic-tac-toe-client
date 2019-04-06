const config = require('../config')
const store = require('../store')

const createGame = function (data) {
  console.log('createGame')
  return $.ajax({
    url: config.apiUrl + 'games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateGame = function (data) {
  console.log('updateGame patch')
  console.log(data)
  return $.ajax({
    url: config.apiUrl + `games/${store.game.id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': event.target.id,
          'value': $(event.target).text()
        },
        'over': store.game.over
      }
    }
  })
}

const showGame = function () {
  return $.ajax({
    url: config.apiUrl + `games/${store.user.id}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const index = function () {
  return $.ajax({
    url: config.apiUrl + 'games/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame,
  updateGame,
  showGame,
  index
}
