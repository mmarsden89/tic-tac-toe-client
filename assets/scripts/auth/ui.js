'use strict'
const store = require('../store')

let statsButtonActive = false

const letsSignUp = function (data) {
  $('#loginForms').hide()
  $('#signUpForm').show()
}

const showBoard = function (data) {
  $('.gameboard').show()
  $('.gamebuttons').show()
  $('#account-page').hide()
}

const signUpSuccess = function (data) {
  console.log('sign up success ran with the data: ', data)
  $('#sign-up').hide()
  $('#loginForms').show()
  $('form').trigger('reset')
}

const signUpFailure = function (data) {
  $('#signUpError').text('There was trouble with the request. Try again')
  console.log('sign up failure ran with the data: ', data)
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  console.log('sign in success ran with the data: ', data)
  $('#loginForms').hide()
  $('#account-page').show()
  store.user = data.user
  $('form').trigger('reset')
}

const signInFailure = function (data) {
  $('#signInError').text('There was an error on sign-in. Try again')
  $('form').trigger('reset')
}

const changePwSuccess = function () {
  console.log('change password success')
  $('form').trigger('reset')
  $('#change-password').hide()
  $('#account-page').show()
}

const changePwFailure = function () {
  $('#changePassError').text('Password was not correct. Try again')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  console.log('sign out successfull')
  $('form').trigger('reset')
  store.user = null
  console.log(store.user)
  $('#account-page').hide()
  $('#loginForms').show()
}

const signOutFailure = function () {
  console.log('sign out failed')
  $('form').trigger('reset')
}

const changePass = function (event) {
  event.preventDefault()
  $('#account-page').hide()
  $('#change-password').show()
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
