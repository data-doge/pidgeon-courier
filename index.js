range = require('lodash.range')
random = require('lodash.random')
$ = require('jquery')
sample = require('lodash.sample')

const { Game, AUTO } = window.Phaser
PigeonCourier = new Game(800, 407, AUTO, '')

PigeonCourier.state.add('menu', menu)
PigeonCourier.state.add('game', game)
PigeonCourier.state.add('end', end)
PigeonCourier.state.start('menu')

