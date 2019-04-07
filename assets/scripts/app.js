'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store')
const events = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const ui = require('./auth/ui.js')
const vsComp = require('./vsComputer')

let currentLetter = 'x'

const gameArray = ['', '', '', '', '', '', '', '', '']
let gameEndCounter = 0
let gameCurrent = true

let vsComput = false
let solo = false

const resetGameMode = function () {
  vsComput = false
  solo = false
  console.log(vsComput)
  console.log(solo)
}

const clearArray = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = ''
  }
}

const whichLogic = function () {
  if (solo === true) {
    console.log('value of solo is : ' + solo)
    gameLogic()
  } else if (vsComput === true) {
    console.log('value of vs comp is: ' + vsComput)
    vsComp.compGameLogic()
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
  console.log(vsComput)
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
    alert(`${currentLetter} won!`)
    console.log(store.game.over)
    gameCurrent = false
    $('#newgameBoard').show()
  } else if (gameEndCounter === 9) {
    alert('tie game!')
  }
}

const newGame = function (target) {
  console.log('new game!')
  clearArray(gameArray)
  clearBoard()
  gameCurrent = true
  gameEndCounter = 0
  currentLetter = 'x'
  console.log(gameArray)
}

const gameLogic = function (target) {
  if ($(`#${event.target.id}`).text() !== 'x' &&
$(`#${event.target.id}`).text() !== 'o' && gameCurrent) {
    $($(`#${event.target.id}`).text(currentLetter))
    gameArray[`${event.target.id}`] = currentLetter
    gameEvents.onUpdateGame()
    gameEndCounter++
    solutions(gameArray)
    console.log(gameArray)
    if (currentLetter === 'x') {
      currentLetter = 'o'
      console.log('new turn')
    } else {
      currentLetter = 'x'
      console.log('new turn')
    }
  } else if (!gameCurrent) {
    store.game.over = true
    console.log(store.game.over)
    alert('game over')
    gameEvents.onUpdateGame()
  } else {
    gameEvents.onUpdateGame()
    console.log($(`#${event.target.id}`).text())
    alert('already taken')
  }
}

$(() => {
  // Play vs Computer
  $('#playvscomp').on('click', vsCompTrigger)
  $('#playvscomp').on('click', ui.showBoard)
  $('#playvscomp').on('click', gameEvents.onCreateGame)
  $('#playvscomp').on('click', gameEvents.onShowGame)
  //
  $('#passtoAccount').on('click', ui.backtoAccount)
  $('#statsToAccount').on('click', ui.backtoAccount)
  $('.gamebuttons').hide()
  $('#newbutton').on('click', '#gamestats', ui.showstats)
  $('#backtoAccount').on('click', resetGameMode)
  $('#backtoAccount').on('click', ui.backtoAccount)
  $('.gameboard').hide()
  $('#showstats').hide()
  $('#account-page').hide()
  $('#change-password').hide()
  $('#newgame').on('click', ui.showBoard)
  $('#changepass').on('click', ui.changePass)
  $('#newgame').on('click', gameEvents.onCreateGame)
  $('#newgame').on('click', gameEvents.onShowGame)
  $('#newgame').on('click', vsSoloTrigger)
  $('#sign-up-button').on('click', ui.letsSignUp)
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('click', events.onSignOut)
  $('.box').on('click', whichLogic)
  $('#newgameBoard').on('click', newGame)
  $('#newgameBoard').on('click', gameEvents.onCreateGame)
  $('#gamestats').on('click', '#gamestats', gameEvents.onShowGame)
})
