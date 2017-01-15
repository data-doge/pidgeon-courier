const { Game, AUTO, Physics } = window.Phaser
const { ARCADE } =  Physics
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

  game.physics.startSystem(ARCADE)
  game.physics.arcade.enable(this.pidgeon)

  this.cursors = game.input.keyboard.createCursorKeys()
}

function update () {
  this.pidgeon.animations.play('flying')

  this.pidgeon.body.velocity.x = 0
  this.pidgeon.body.velocity.y = 0

  const { left, right, up, down } = this.cursors

  if (left.isDown) {
    this.pidgeon.body.velocity.x = -100
  } else if (right.isDown) {
    this.pidgeon.body.velocity.x = 100
  } else if (up.isDown) {
    this.pidgeon.body.velocity.y = -100
  } else if (down.isDown) {
    this.pidgeon.body.velocity.y = 100
  }
}
