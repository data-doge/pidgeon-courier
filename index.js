const { Game, AUTO } = window.Phaser
const range = require('lodash.range')

const game = new Game(800, 600, AUTO, '', {
  preload,
  create,
  update
})

function preload () {
  game.load.spritesheet('pidgeon', './assets/master-pidgeon-spritesheet.png', 64, 64)
}

function create () {
  this.pidgeon = game.add.sprite(50, 50, 'pidgeon')
  this.pidgeon.animations.add('flying', range(12, 15), 10, true)
}

function update () {
  this.pidgeon.animations.play('flying')
}
