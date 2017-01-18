const game = function(){}

game.prototype = {

  preload: function () {
  },

  create: function () {
    const { Physics, Camera, Keyboard } = window.Phaser
    const { ARCADE } = Physics

    const speed = 400
    const height = 407
    const worldWidth = 4000

    this.physics.startSystem(ARCADE)
    this.world.setBounds(0, 0, worldWidth, height)

    this.city = this.add.tileSprite(0, 0, worldWidth, height, 'city')

    this.pidgeon = this.add.sprite(50, 50, 'pidgeon')
    this.pidgeon.animations.add('flying', range(12, 15), 10, true)
    this.physics.arcade.enable(this.pidgeon)
    this.camera.follow(this.pidgeon, Camera.FOLLOW_LOCKON)
    this.murderer = false
    this.speed = 300
    // this.pidgeon.body.gravity.y = 2000

    this.explosion = this.make.sprite(-50, -50, 'explosion')
    this.explosion.animations.add('exploding', range(0, 24), 10, false)

    // adding ufos
    this.ufos = this.add.physicsGroup()
    let x = random(200, 1000)
    while (x < 4000) {
      let y = random(25, 200)
      this.ufos.create(x, y, 'ufo')
      x += random(200, 1000)
    }
    this.ufos.callAll('animations.add', 'animations', 'abducting', range(0, 11), 10, true)
    this.ufos.enableBody = true

    this.coo = this.add.audio('coo')

    this.cursors = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Keyboard.SPACEBAR)

  },

  update: function () {
    this.pidgeon.animations.play('flying')
    this.ufos.callAll('animations.play', 'animations', 'abducting')

    this.pidgeon.body.velocity.x = 0
    this.pidgeon.body.velocity.y = 0

    if (this.spacebar.isDown) {
      this.coo.play()
    }

    const { left, right, up, down } = this.cursors
    if (left.isDown) { this.pidgeon.body.velocity.x = -this.speed }
    if (right.isDown) { this.pidgeon.body.velocity.x = this.speed }
    if (up.isDown) { this.pidgeon.body.velocity.y = -this.speed }
    if (down.isDown) { this.pidgeon.body.velocity.y = this.speed }

    this.physics.arcade.collide(this.pidgeon, this.ufos, (pidgeon, ufo) => {
      const { x, y } = pidgeon.body
      this.add.existing(this.explosion)
      this.explosion.x = x
      this.explosion.y = y
      this.explosion.play('exploding')
      this.explosion.animations.currentAnim.killOnComplete = true
      const startTime = random(10, 300)
      $('#zomg').append(`<iframe id="mc-sniper-1" width="560" height="315" src="https://www.youtube.com/embed/mr8CbJber6A?autoplay=1&start=${startTime}" frameborder="0" allowfullscreen></iframe>`)
      $('#zomg').append(`<iframe id="mc-sniper-2" width="560" height="315" src="https://www.youtube.com/embed/mr8CbJber6A?autoplay=1&start=${startTime}" frameborder="0" allowfullscreen></iframe>`)
      $('#zomg').append(`<iframe id="mc-sniper-3" width="280" height="158" src="https://www.youtube.com/embed/mr8CbJber6A?autoplay=1&start=${startTime}" frameborder="0" allowfullscreen></iframe>`)
      let deg = 0
      this.murdererTimer = this.time.events.loop(10, () => {
        $('body').css({ background: sample(['black', 'white', 'cyan', 'gold']) })
        $('#alert').toggle()
        deg += 0.25
        $('iframe').css({ transform: 'rotateY(${deg % 360}deg)' })
      }, this)
      this.coo.play()
      pidgeon.kill()
      ufo.kill()
      this.ufos.remove(ufo)
      this.murderer = true
    })

    if(this.murderer) {
      $('body').bind('click', function(event){
        $(this).unbind(event);
        PigeonCourier.time.events.remove(this.murdererTimer)
        PigeonCourier.state.start('end')
      })
    }
  }
}
