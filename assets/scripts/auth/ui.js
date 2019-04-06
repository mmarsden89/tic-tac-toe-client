'use strict'
const store = require('../store')

const letsSignUp = function (data) {
  $('#loginForms').hide()
  $('#sign-up').show()
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
  console.log('sign up failure ran with the data: ', data)
  $('#sign-up').hide()
  $('#loginForms').show()
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
  console.log('sign in failure ran with the data: ', data)
  $('form').trigger('reset')
}

const changePwSuccess = function () {
  console.log('change password success')
  $('form').trigger('reset')
  $('#change-password').hide()
  $('#account-page').show()
}

const changePwFailure = function () {
  console.log('change password failure')
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
  $('.gameboard').hide()
  $('.gamebuttons').hide()
  $('#account-page').show()
}

const showstats = function (event) {
  event.preventDefault()
  $('#account-page').hide()
  $('.gamebuttons').hide()
  $('#showstats').show()
  $('#stats').html('<p>Your game data is as followed: Games played: ' + store.userGamesLength + '</p>')
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
  showstats
}
