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
      grow = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      shrink = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      turnLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      turnRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      
      grow.onDown.add(this.grow.bind(this));
      shrink.onDown.add(this.shoot.bind(this));
      shrink.onDown.add(this.shrink.bind(this));
     
      turnLeft.onDown.add(this.polygon.turn.bind(this.polygon, rotate, true));
      turnLeft.onDown.add(this.draw.bind(this, this.bitmap, game));
      turnRight.onDown.add(this.polygon.turn.bind(this.polygon, rotate, false));
      turnRight.onDown.add(this.draw.bind(this, this.bitmap, game));

    }
  }

  Player.prototype.moveForward = function(p, keyPressed) {
    if (keyPressed) {
      this.velocity.x = 100 * Math.cos(p.direction);
      this.velocity.y = 100 * Math.sin(p.direction);
    } else {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    this._save();
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

  /*
   * Save current Player state to firebase
   * @api private
   **/
  Player.prototype._save = function() {
    this.firebase.push({
      id: this.id,
      type: this.type,
      point: this.velocity,
      sides: this.polygon.sides
    });
  }

  Player.prototype.grow = function() {
    this.polygon.addSide();
    this.draw();
    this._save();
  }

  Player.prototype.shrink = function() {
    this.polygon.removeSide();
    this.draw();
    this._save();
  }

  Player.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.polygon(this.polygon, '#FFFFFF');

  }

  return Player;
});
