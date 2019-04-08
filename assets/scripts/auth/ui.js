'use strict'
const store = require('../store')

let statsButtonActive = false

const letsSignUp = function (data) {
  $('#loginForms').hide()
  $('#signUpForm').show()
}

const showBoard = function (data) {
  $('#signmessage').hide()
  $('.gameboard').show()
  $('.gamebuttons').show()
  $('#account-page').hide()
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
}

const signInFailure = function (data) {
  $('#signInError').text('There was an error on sign-in. Try again')
  $('form').trigger('reset')
}

const changePwSuccess = function () {
  $('#signInError').text('Change Password Success!')
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
  $('#account-page').hide()
  $('#loginForms').show()
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
  $('.gameboard').hide()
  $('.gamebuttons').hide()
  $('#showstats').hide()
  $('#change-password').hide()
  $('#account-page').show()
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
  $('#stats').html('<h1>Your Game Stats</h1> <p>Games played: ' + store.userGamesLength + '</p>')
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
