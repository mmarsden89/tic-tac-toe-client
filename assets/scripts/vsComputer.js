'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store')
const gameEvents = require('./game/events')

let currentLetter = 'x'
let playerGone = false

const gameArray = ['', '', '', '', '', '', '', '', '']
let gameEndCounter = 0
let gameCurrent = true

const clearArray = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = ''
  }
}

const gameCurrentFlipper = function () {
  if (gameCurrent === true) {
    gameCurrent = false
    console.log('gamecurrent false is running')
  } else if (gameCurrent === false) {
    gameCurrent = true
    console.log('gamecurrent true is running')
  }
}

// I think we need to add a new ajax call for the COMP mode
// It's looking for the event trigger to feed into the data
// but the computer doesn't run on an event

const computerPlay = function () {
  const randomPlay = Math.floor(Math.random() * 8)
  console.log(randomPlay)
  if ($(`#${randomPlay}`).text() !== 'x' && $(`#${randomPlay}`).text() !== 'o' && playerGone === true && gameCurrent === true) {
    $(`#${randomPlay}`).text('o')
    gameArray[randomPlay] = 'o'
    currentLetter = 'o'
    console.log(gameArray[randomPlay])
    store.computer = randomPlay
    setTimeout(function () { gameEvents.onUpdateComputer() }, 3000)
    gameEndCounter++
    solutions(gameArray)
  } else if (($(`#${randomPlay}`).text() === 'x' || $(`#${randomPlay}`).text() === 'o') && playerGone === true && gameCurrent === true) {
    computerPlay()
  } else {
    console.log('computer error')
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
    alert(`${currentLetter} won!`)
    console.log(store.game.over)
    gameCurrent = false
  } else if (gameEndCounter === 9) {
    alert('tie game!')
  }
}

const compNewGame = function (target) {
  console.log('new game!')
  console.log(gameArray)
  clearArray(gameArray)
  clearBoard()
  gameCurrent = true
  gameEndCounter = 0
  currentLetter = 'x'
  gameCurrentFlipper()
  console.log(gameArray)
}

const compGameLogic = function (target) {
  console.log('gamecurrent is set to ' + gameCurrent)
  if ($(`#${event.target.id}`).text() !== 'x' &&
$(`#${event.target.id}`).text() !== 'o' && gameCurrent) {
    $($(`#${event.target.id}`).text('x'))
    gameArray[`${event.target.id}`] = 'x'
    currentLetter = 'x'
    playerGone = true
    gameEvents.onUpdateGame()
    gameEndCounter++
    solutions(gameArray)
    computerPlay()
    console.log('current game array is ' + gameArray)
  } else if (!gameCurrent) {
    store.game.over = true
    console.log(store.game.over)
    gameEvents.onUpdateGame()
  } else {
    gameEvents.onUpdateGame()
    console.log($(`#${event.target.id}`).text())
    alert('already taken')
  }
}

module.exports = {
  compGameLogic,
  computerPlay,
  gameCurrentFlipper,
  compNewGame
}
