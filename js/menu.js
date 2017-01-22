const { Spam } = require('./objects')
const range = require('lodash.range')

const menu = function () {}

menu.prototype = {

  preload: function () {
    this.load.audio('coo', './assets/coo.wav')
    this.load.image('city', './assets/city.jpg')
    this.load.spritesheet('pidgeon', './assets/master-pidgeon-spritesheet.png', 64, 64)
    this.load.spritesheet('ufo', './assets/ufo.png', 58, 210)
    this.load.spritesheet('explosion', './assets/explosion.png', 64, 64)
    this.loadSpam()
  },

  create: function () {
    var style = { font: '30px Arial', fill: '#fff', align: 'center' }
    var text = this.add.text(this.game.width / 2, this.game.height / 2, 'tap to start', style)
    text.anchor.set(0.5)
    this.addSpam()
  },

  update: function () {
    if (this.input.activePointer.justPressed()) {
      this.state.start('game')
    }
  },

  loadSpam: function(){
    range(0,9).forEach((value) => {
      this.load.image(`spam_${value}`, `./assets/spam_${value}.jpg`)
    })
  },

  addSpam: function(){
    range(0,9).forEach((value) => {
      let sprite = this.add.sprite(value*200, 30, `spam_${value}`)
      sprite.width = 35
      sprite.height = 50
    })
  }
}

module.exports = menu
