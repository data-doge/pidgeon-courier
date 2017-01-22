const menu = require('./js/menu')
const game = require('./js/game')
const end = require('./js/end')

const { Game, AUTO } = window.Phaser
const PigeonCourier = new Game(800, 407, AUTO, '')

PigeonCourier.state.add('menu', menu)
PigeonCourier.state.add('game', game)
PigeonCourier.state.add('end', end)
PigeonCourier.state.start('menu')
