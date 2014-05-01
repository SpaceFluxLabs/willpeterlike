var Player = (function(Phaser) {

  function Player(id, game, firebase) {

    this.id = id;
    this.firebase = firebase;
    this.velocity = new Phaser.Point();

    // Register keyboard events
    
    var up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
      , down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
      , left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
      , right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
      , speed = 200;

    up.onDown.add(this.setVelocity.bind(0, -speed), this);
    up.onUp.add(this.setVelocity.bind(0, speed), this);
    down.onDown.add(this.setVelocity.bind(0, speed), this);
    down.onUp.add(this.setVelocity.bind(0, -speed), this);

    right.onDown.add(this.setVelocity.bind(speed, 0), this);
    right.onUp.add(this.setVelocity.bind(-speed, 0), this);
    left.onDown.add(this.setVelocity.bind(-speed, 0), this);
    left.onUp.add(this.setVelocity.bind(speed, 0), this);

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

