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
    this.loadSpams()
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

  loadSpams: function(){
    this.spams = range(0,9).map((value) => {
      return new Spam({ game: this,
                        name: `spam_${value}`, 
                        path: `./assets/spam_${value}.jpg`, 
                        width: 35, 
                        height: 50})
    })
  },

  addSpam: function(){
    this.spams.forEach((spam, index) => {
      spam.summon({ x: index * 250, y: 30 })
    })
  }
}

module.exports = menu
