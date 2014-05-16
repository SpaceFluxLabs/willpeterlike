define(['Phaser', 'PhaserExt', 'Polygon'], function(Phaser, PhaserExt, Polygon) {
  function Player(id, game, firebase,  shouldListen) {

    var up
      , down
      , left
      , right
      , grow
      , shrink
      , turnLeft
      , turnRight
      , forward
      , speed = 100
      , rotate = Math.PI/9;
    
    this.bitmap = game.add.bitmapData(100, 100)
    this.type = "Player";
    this.id = id;
    this.firebase = firebase;
    this.velocity = new Phaser.Point();
    this.polygon = new Polygon(50,50,4,50, '#FFFFFF');

    this.bitmap.polygon(this.polygon, '#FFFFFF');
    this.sprite = game.add.sprite(100, 100, this.bitmap);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
      
    // Register keyboard events

    if(shouldListen) {
      up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      grow = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      shrink = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      turnLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      turnRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      forward = game.input.keyboard.addKey(Phaser.Keyboard.W);

      up.onDown.add(this.setVelocity.bind(this, 0, -speed));
      up.onUp.add(this.setVelocity.bind(this, 0, speed));
      down.onDown.add(this.setVelocity.bind(this, 0, speed));
      down.onUp.add(this.setVelocity.bind(this, 0, -speed));

      right.onDown.add(this.setVelocity.bind(this, speed, 0));
      right.onUp.add(this.setVelocity.bind(this, -speed, 0));
      left.onDown.add(this.setVelocity.bind(this, -speed, 0));
      left.onUp.add(this.setVelocity.bind(this, speed, 0));

      grow.onDown.add(this.polygon.addSide.bind(this.polygon));
      grow.onDown.add(this.draw.bind(this, this.bitmap, game));
      shrink.onDown.add(this.shoot.bind(this));
      shrink.onDown.add(this.polygon.removeSide.bind(this.polygon));
      shrink.onDown.add(this.draw.bind(this, this.bitmap, game));
     
      turnLeft.onDown.add(this.polygon.turn.bind(this.polygon, rotate, true));
      turnLeft.onDown.add(this.draw.bind(this, this.bitmap, game));
      turnRight.onDown.add(this.polygon.turn.bind(this.polygon, rotate, false));
      turnRight.onDown.add(this.draw.bind(this, this.bitmap, game));
    }
  }

  Player.prototype.setVelocity = function(x, y) {

    this.velocity.x += x;
    this.velocity.y += y;

    this.firebase.push({
      id: this.id,
      type: this.type,
      point: this.velocity
    });

  };

  Player.prototype.shoot = function() {
    if (this.polygon.numSides() > 3) {
      var linePos = new Phaser.Point(this.sprite.body.x + 150, this.sprite.body.y);
      this.firebase.push({
        type: "Line",
        point: linePos
      }) 
    }
  }

  Player.prototype.grow = function() {
    this.polygon.addSide();
    this.bitmap.clear();
    this.bitmap.polygon(this.polygon, '#FFFFFF');
  }
  
  Player.prototype.draw = function(bitmap, game) {

    bitmap.clear();
    bitmap.polygon(this.polygon, '#FFFFFF');

  }

  return Player;
});
