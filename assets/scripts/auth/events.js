
const testFunc = function () {
  console.log('hey this worked')
}

const addHandlers = function () {
  $('#boxZero').mousedown(testFunc)
}

module.export = {
  addHandlers
}
