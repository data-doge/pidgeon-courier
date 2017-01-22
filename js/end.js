const end = function() {}

end.prototype = {

	create: function() {
		// wrap up from end-game craziness
		$('#zomg').empty();
		$('#alert').hide()
    $('body').css('background', 'white')

    var style = { font: "30px Arial", fill: "#fff", align: "center" }
    var text = this.add.text(this.game.width/2, this.game.height/2, "replay??", style)
    text.anchor.set(0.5)
    this.murderer = false
  },

  update: function(){
    if(this.input.activePointer.justPressed()) {
      this.state.start('game')
    }
  }
}