const { Game, AUTO, Physics, Camera } = window.Phaser
const { ARCADE } =  Physics
const range = require('lodash.range')

const speed = 400
const height = 407
const worldWidth = 4000

const game = new Game(800, 407, AUTO, '', {
  preload,
  create,
  update
})

console.log({ game })

function preload () {
  game.load.image('city', './assets/city.jpg')
  game.load.spritesheet('pidgeon', './assets/master-pidgeon-spritesheet.png', 64, 64)
}

function create () {
  this.city = game.add.tileSprite(0, 0, worldWidth, height, 'city')

  this.pidgeon = game.add.sprite(50, 50, 'pidgeon')
  this.pidgeon.animations.add('flying', range(12, 15), 10, true)

  game.physics.startSystem(ARCADE)
  game.physics.arcade.enable(this.pidgeon)
  // this.pidgeon.body.gravity.y = 2000

  this.cursors = game.input.keyboard.createCursorKeys()

  game.camera.follow(this.pidgeon, Camera.FOLLOW_LOCKON)

  game.world.setBounds(0, 0, worldWidth, height)
}

function update () {
  this.pidgeon.animations.play('flying')

  this.pidgeon.body.velocity.x = 0
  this.pidgeon.body.velocity.y = 0

  const { left, right, up, down } = this.cursors

  if (left.isDown) {
    this.pidgeon.body.velocity.x = -speed
  } else if (right.isDown) {
    this.pidgeon.body.velocity.x = speed
  } else if (up.isDown) {
    this.pidgeon.body.velocity.y = -speed
  } else if (down.isDown) {
    this.pidgeon.body.velocity.y = speed
  }
}
