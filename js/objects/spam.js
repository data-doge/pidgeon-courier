class Spam {

  constructor ({ game, name, path, width, height }) {
  	this.game = game
  	this.name = name
  	this.path = path
  	this.width = width
  	this.height = height
  	this.game.load.image(this.name, this.path) // preload
  }

  summon ({ x, y }) {
		const sprite = this.game.add.sprite(x, y, this.name)
		sprite.x = x
		sprite.y = y
    sprite.width = this.width
    sprite.height = this.height
    this.sprite = sprite
  }

}

module.exports = Spam

