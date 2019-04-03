'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const events = require('./auth/events.js')

let currentLetter = 'x'

const gameArray = ['', '', '', '', '', '', '', '', '']
let gameEndCounter = 0
console.log(gameArray)

let gameCurrent = true

const clearArray = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = ''
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
    alert(`${currentLetter} won!`)
    gameCurrent = false
    $('.newgame').css('display', 'block')
  } else if (gameEndCounter === 9) {
    alert('tie game!')
  }
}

$(() => {
  $('.box').on('click', function (target) {
    if ($(`#${event.target.id}`).text() !== 'x' &&
  $(`#${event.target.id}`).text() !== 'o' && gameCurrent) {
      $($(`#${event.target.id}`).text(currentLetter))
      gameArray[`${event.target.id}`] = currentLetter
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
      alert('game over')
    } else {
      console.log($(`#${event.target.id}`).text())
      alert('already taken')
    }
  })
  $('.newgame').on('click', function (target) {
    console.log('new game!')
    clearArray(gameArray)
    clearBoard()
    gameCurrent = true
    gameEndCounter = 0
    currentLetter = 'x'
    console.log(gameArray)
  })
})
