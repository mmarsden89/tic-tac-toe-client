'use strict'
const store = require('../store')

let statsButtonActive = false

const letsSignUp = function (data) {
  $('#loginForms').hide()
  $('#signUpForm').show()
}

const showBoard = function (data) {
  $('#signmessage').text('')
  $('.gamearea').show()
  $('.gamebuttons').show()
  $('#account-page').hide()
  $('body').css('background-color', 'white')
}

const signUpSuccess = function (data) {
  $('#signInError').css('color', 'white')
  $('#signInError').text('Sign Up Success!')
  $('#signUpForm').hide()
  $('#loginForms').show()
  $('form').trigger('reset')
}

const signUpFailure = function (data) {
  $('#signUpError').css('color', 'red')
  $('#signUpError').text('There was trouble with the request. Try again')
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('#loginForms').hide()
  $('#account-page').show()
  store.user = data.user
  $('#signmessage').text('Sign in Success!')
  $('form').trigger('reset')
  statsButtonActive = false
}

const signInFailure = function (data) {
  $('#signInError').text('There was an error on sign-in. Try again')
  $('#signInError').css('color', 'red')
  $('form').trigger('reset')
}

const changePwSuccess = function () {
  $('#signmessage').text('Change Password Success!')
  $('#changePassError').text('')
  $('form').trigger('reset')
  $('#change-password').hide()
  $('#account-page').show()
}

const changePwFailure = function () {
  $('#changePassError').text('Password was not correct. Try again')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  $('#signInError').css('color', 'white')
  $('#signInError').text('Sign Out Success!')
  $('form').trigger('reset')
  store.user = null
  store.game = null
  store.userGamesLength = null
  $('#account-page').hide()
  $('#loginForms').show()
  $('#gamestats').remove()
}

const signOutFailure = function () {
  $('form').trigger('reset')
}

const changePass = function (event) {
  event.preventDefault()
  $('#account-page').hide()
  $('#change-password').show()
  $('form').trigger('reset')
}

const backtoAccount = function (event) {
  event.preventDefault()
  $('#displayMessage').text('')
  $('#changePassError').text('')
  $('.gamearea').hide()
  $('.gamebuttons').hide()
  $('#showstats').hide()
  $('#change-password').hide()
  $('#account-page').show()
  $('#signmessage').text('')
  $('body').css('background-color', '#0c3472')
  if (!statsButtonActive) {
    $('#newbutton').append(`<button id="gamestats" class="accountsbutton">Game Stats</button>`)
  }
  statsButtonActive = true
}

const showstats = function (event) {
  event.preventDefault()
  $('#account-page').hide()
  $('.gamebuttons').hide()
  $('#showstats').show()
  if (store.userGamesLength === undefined || store.userGamesLength === null) {
    $('#stats').html('<h1>Your Game Stats</h1><p>Currently there are no stats. Start a new game and come back!</p>')
    $('#stats').css({
      'height': '65vh',
      'display': 'flex',
      'align-items': 'center',
      'flex-direction': 'column',
      'justify-content': 'center'
    })
  } else {
    $('#stats').html('<h1>Your Game Stats</h1> <p>Games played: ' + store.userGamesLength + '</p>')
    $('#stats').css({
      'display': 'flex',
      'align-items': 'center',
      'flex-direction': 'column',
      'justify-content': 'flex-end'
    })
  }
}

const signUpToLogin = function (event) {
  event.preventDefault()
  $('#signUpForm').hide()
  $('#loginForms').show()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePwSuccess,
  changePwFailure,
  signOutSuccess,
  signOutFailure,
  letsSignUp,
  showBoard,
  changePass,
  backtoAccount,
  showstats,
  signUpToLogin
}
