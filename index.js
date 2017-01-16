const { Game, AUTO, Physics, Camera, Keyboard } = window.Phaser
const { ARCADE } = Physics
const range = require('lodash.range')
const random = require('lodash.random')

const speed = 400
const height = 407
const worldWidth = 4000

const game = new Game(800, 407, AUTO, '', {
  preload,
  create,
  update
})

function preload () {
  game.load.audio('coo', './assets/coo.wav')
  game.load.image('city', './assets/city.jpg')
  game.load.spritesheet('pidgeon', './assets/master-pidgeon-spritesheet.png', 64, 64)
  game.load.spritesheet('ufo', './assets/ufo.png', 58, 210)
  game.load.spritesheet('explosion', './assets/explosion.png', 64, 64)
}

function create () {
  game.physics.startSystem(ARCADE)

  this.city = game.add.tileSprite(0, 0, worldWidth, height, 'city')

  this.pidgeon = game.add.sprite(50, 50, 'pidgeon')
  this.pidgeon.animations.add('flying', range(12, 15), 10, true)

  this.explosion = game.make.sprite(-50, -50, 'explosion')
  this.explosion.animations.add('exploding', range(0, 24), 10, false)

  // adding ufos
  this.ufos = game.add.physicsGroup()
  let x = random(200, 1000)
  while (x < 4000) {
    let y = random(25, 200)
    this.ufos.create(x, y, 'ufo')
    x += random(200, 1000)
  }
  this.ufos.callAll('animations.add', 'animations', 'abducting', range(0, 11), 10, true)
  this.ufos.enableBody = true

  this.coo = game.add.audio('coo')

  game.physics.arcade.enable(this.pidgeon)
  // this.pidgeon.body.gravity.y = 2000

  this.cursors = game.input.keyboard.createCursorKeys()
  this.spacebar = game.input.keyboard.addKey(Keyboard.SPACEBAR)

  game.camera.follow(this.pidgeon, Camera.FOLLOW_LOCKON)

  game.world.setBounds(0, 0, worldWidth, height)
}

function update () {
  this.pidgeon.animations.play('flying')
  this.ufos.callAll('animations.play', 'animations', 'abducting')

  this.pidgeon.body.velocity.x = 0
  this.pidgeon.body.velocity.y = 0

  if (this.spacebar.isDown) {
    this.coo.play()
  }

  const { left, right, up, down } = this.cursors
  if (left.isDown) { this.pidgeon.body.velocity.x = -speed }
  if (right.isDown) { this.pidgeon.body.velocity.x = speed }
  if (up.isDown) { this.pidgeon.body.velocity.y = -speed }
  if (down.isDown) { this.pidgeon.body.velocity.y = speed }

  game.physics.arcade.collide(this.pidgeon, this.ufos, (pidgeon, ufo) => {
    const { x, y } = pidgeon.body
    game.add.existing(this.explosion)
    this.explosion.x = x
    this.explosion.y = y
    this.explosion.play('exploding')
    this.explosion.animations.currentAnim.killOnComplete = true
    this.coo.play()
    pidgeon.kill()
    ufo.kill()
    this.ufos.remove(ufo)
  })
}
