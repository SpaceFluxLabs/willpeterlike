var Player = (function(Phaser) {

  function Player(id, game, firebase, shouldListen) {

    this.id = id;
    this.firebase = firebase;
    this.velocity = new Phaser.Point();
    this.circle = game.add.sprite(400, 300, 'circleImg');
    game.physics.enable(this.circle, Phaser.Physics.ARCADE);

    var up, down, left, right
      , speed = 200;
    // Register keyboard events
    
    if(shouldListen) {
      up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
      down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
      left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
      right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

      up.onDown.add(this.setVelocity.bind(this, 0, -speed));
      up.onUp.add(this.setVelocity.bind(this, 0, speed));
      down.onDown.add(this.setVelocity.bind(this, 0, speed));
      down.onUp.add(this.setVelocity.bind(this, 0, -speed));

      right.onDown.add(this.setVelocity.bind(this, speed, 0));
      right.onUp.add(this.setVelocity.bind(this, -speed, 0));
      left.onDown.add(this.setVelocity.bind(this, -speed, 0));
      left.onUp.add(this.setVelocity.bind(this, speed, 0));

    }
  }


  Player.prototype.setVelocity = function(x, y) {

    this.velocity.x += x;
    this.velocity.y += y;

    this.firebase.push({
      id: this.id,
      point: this.velocity
    });

  };

  return Player;

})(Phaser);

