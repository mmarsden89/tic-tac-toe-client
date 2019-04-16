'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store')
const events = require('./auth/events')
const gameEvents = require('./game/events')
const ui = require('./auth/ui')
const vsComp = require('./vsComputer')

let currentLetter = 'x'
store.player = 'x'

if (!store.playerChar) {
  currentLetter = 'x'
} else {
  currentLetter = store.player
}

const gameArray = ['', '', '', '', '', '', '', '', '']
let gameEndCounter = 0
let gameCurrent = true

let vsComput = false
let solo = false

const changeBackground = function () {
  for (let i = 0; i < 24; i++) {
    if ($(`.animate${i}`).text() !== 'o') {
      $(`.animate${i}`).text(store.player)
    }
  }
}

const resetGameMode = function () {
  vsComput = false
  solo = false
}

const clearArray = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = ''
  }
}

const whichLogic = function () {
  if (solo === true) {
    gameLogic()
  } else if (vsComput === true) {
    vsComp.compGameLogic()
  }
}

const whichNewGame = function () {
  if (solo === true) {
    newGame()
  } else if (vsComput === true) {
    vsComp.compNewGame()
  }
}

const vsSoloTrigger = function () {
  if (solo === true) {
    solo = false
  } else {
    solo = true
  }
}

const vsCompTrigger = function () {
  if (vsComput === true) {
    vsComput = false
  } else {
    vsComput = true
  }
}

const clearBoard = function () {
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
}

const solutions = function (array) {
  if ((array[0] === array[1] && array[0] === array[2] && array[0] === currentLetter) ||
    (array[3] === array[4] && array[3] === array[5] && array[3] === currentLetter) ||
    (array[6] === array[7] && array[6] === array[8] && array[6] === currentLetter) ||
    (array[0] === array[3] && array[0] === array[6] && array[0] === currentLetter) ||
    (array[1] === array[4] && array[1] === array[7] && array[1] === currentLetter) ||
    (array[2] === array[5] && array[2] === array[8] && array[2] === currentLetter) ||
    (array[0] === array[4] && array[0] === array[8] && array[0] === currentLetter) ||
    (array[2] === array[4] && array[2] === array[6] && array[2] === currentLetter)
  ) {
    store.game.over = true
    gameEvents.onUpdateGame()
    gameCurrent = false
    $('#newgameBoard').show()
    $('#displayMessage').text(`Player ${currentLetter} won!`)
  } else if (gameEndCounter === 9) {
    $('#displayMessage').text('tie game!')
    gameCurrent = false
  }
}

const newGame = function (target) {
  clearArray(gameArray)
  clearBoard()
  gameCurrent = true
  gameEndCounter = 0
  currentLetter = store.player
}

const gameLogic = function (target) {
  if ($(`#${event.target.id}`).text() !== 'x' &&
$(`#${event.target.id}`).text() !== 'o' && gameCurrent) {
    $($(`#${event.target.id}`).text(currentLetter))
    gameArray[`${event.target.id}`] = currentLetter
    gameEvents.onUpdateGame()
    gameEndCounter++
    solutions(gameArray)
    if (currentLetter !== 'o' && gameCurrent) {
      currentLetter = 'o'
      $('#displayMessage').text('Player Os turn')
    } else if (currentLetter === 'o' && gameCurrent) {
      currentLetter = store.player
      $('#displayMessage').text('Player Xs turn')
    }
  } else if (!gameCurrent) {
    store.game.over = true
    $('#displayMessage').text('Game Over! Start a new game to continue playing')
    gameEvents.onUpdateGame()
  } else {
    gameEvents.onUpdateGame()
    $('#displayMessage').text('already taken')
  }
}

$(() => {
  // Defaults
  $('#settings').hide()
  $('.gamebuttons').hide()
  $('#signUpForm').hide()
  $('.gamearea').hide()
  $('#showstats').hide()
  $('#account-page').hide()
  $('#change-password').hide()
  //

  // Play vs Computer
  $('#playvscomp').on('click', vsCompTrigger)
  $('#playvscomp').on('click', ui.showBoard)
  $('#playvscomp').on('click', gameEvents.onCreateGame)
  $('#playvscomp').on('click', gameEvents.onShowGame)
  $('#playvscomp').on('click', vsComp.compNewGame)
  //
  $('#backtoLogin').on('click', ui.signUpToLogin)
  $('#passtoAccount').on('click', ui.backtoAccount)
  $('#statsToAccount').on('click', ui.backtoAccount)
  $('#newbutton').on('click', ui.showstats)
  $('#backtoAccount').on('click', resetGameMode)
  $('#backtoAccount').on('click', ui.backtoAccount)
  $('#settingsButton').on('click', ui.showSettings)
  $('#playerForm').on('submit', ui.onChangePlayer)
  $('#playerForm').on('submit', changeBackground)

  $('#newgame').on('click', ui.showBoard)
  $('#changepass').on('click', ui.changePass)
  $('#newgame').on('click', gameEvents.onCreateGame)
  $('#newgame').on('click', gameEvents.onShowGame)
  $('#newgame').on('click', vsSoloTrigger)
  $('#newgame').on('click', newGame)
  $('#sign-up-button').on('click', ui.letsSignUp)
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('click', events.onSignOut)
  $('.box').on('click', whichLogic)
  $('#newgameBoard').on('click', gameEvents.onCreateGame)
  $('#gamestats').on('click', gameEvents.onShowGame)
  $('#newgameBoard').on('click', whichNewGame)
})
