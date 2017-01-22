const menu = function () {}

menu.prototype = {

  preload: function () {
    this.load.audio('coo', './assets/coo.wav')
    this.load.image('city', './assets/city.jpg')
    this.load.spritesheet('pidgeon', './assets/master-pidgeon-spritesheet.png', 64, 64)
    this.load.spritesheet('ufo', './assets/ufo.png', 58, 210)
    this.load.spritesheet('explosion', './assets/explosion.png', 64, 64)
  },

  create: function () {
    var style = { font: '30px Arial', fill: '#fff', align: 'center' }
    var text = this.add.text(this.game.width / 2, this.game.height / 2, 'tap to start', style)
    text.anchor.set(0.5)
  },

  update: function () {
    if (this.input.activePointer.justPressed()) {
      this.state.start('game')
    }
  }

}

module.exports = menu
