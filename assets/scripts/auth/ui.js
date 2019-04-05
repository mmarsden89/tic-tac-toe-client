'use strict'
const store = require('../store')
const gameEvents = require('../game/events')
const gameApi = require('../game/api')

const letsSignUp = function (data) {
  $('#loginForms').hide()
  $('#sign-up').show()
}

const showBoard = function (data) {
  $('.gameboard').show()
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
}

const changePwFailure = function () {
  console.log('change password failure')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  console.log('sign out successfull')
  $('form').trigger('reset')
  store.user = null
}

const signOutFailure = function () {
  console.log('sign out failed')
  $('form').trigger('reset')
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
  showBoard
}
