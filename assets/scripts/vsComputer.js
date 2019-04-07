'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store')
const gameEvents = require('./game/events.js')

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



const computerPlay = function () {
  const randomPlay = Math.floor(Math.random() * 8)
  console.log(randomPlay)
  if ($(`#${randomPlay}`).text() !== 'x' && $(`#${randomPlay}`).text() !== 'o' && playerGone === true && gameCurrent === true) {
    $(`#${randomPlay}`).text('o')
    gameArray[`${randomPlay}`] = 'o'
    console.log(gameArray[randomPlay])
    gameEvents.onUpdateGame()
    gameEndCounter++
    solutions(gameArray)
  } else if (gameCurrent === false) {
    console.log('woops')
  } else {
    computerPlay()
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

const compGameLogic = function (target) {
  console.log('is this working')
  if ($(`#${event.target.id}`).text() !== 'x' &&
$(`#${event.target.id}`).text() !== 'o' && gameCurrent) {
    $($(`#${event.target.id}`).text('x'))
    gameArray[`${event.target.id}`] = 'x'
    playerGone = true
    gameEvents.onUpdateGame()
    gameEndCounter++
    solutions(gameArray)
    console.log(gameArray)
    computerPlay()
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
  computerPlay
}
