var Player = (function(Phaser) {
  function Player(id, game, firebase,  shouldListen) {

    var up
      , down
      , left
      , right
      , grow
      , shrink
      , speed = 100
      , bitmap = game.add.bitmapData(200, 200)
      , polygon = new Polygon(100, 100, 3, 50, '#FFFFFF');

    this.id = id;
    this.firebase = firebase;
    this.velocity = new Phaser.Point();
    this.polygon = new Polygon(100,100,3,50, '#FFFFFF');


    bitmap = game.add.bitmapData(200, 200);
    bitmap.polygon(this.polygon, '#FFFFFF');
    this.sprite = game.add.sprite(400, 300, bitmap);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

      
    // Register keyboard events
    if(shouldListen) {
      up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
      down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
      left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
      right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
      grow = game.input.keyboard.addKey(Phaser.Keyboard.Q)
      shrink = game.input.keyboard.addKey(Phaser.Keyboard.A)

      up.onDown.add(this.setVelocity.bind(this, 0, -speed));
      up.onUp.add(this.setVelocity.bind(this, 0, speed));
      down.onDown.add(this.setVelocity.bind(this, 0, speed));
      down.onUp.add(this.setVelocity.bind(this, 0, -speed));

      right.onDown.add(this.setVelocity.bind(this, speed, 0));
      right.onUp.add(this.setVelocity.bind(this, -speed, 0));
      left.onDown.add(this.setVelocity.bind(this, -speed, 0));
      left.onUp.add(this.setVelocity.bind(this, speed, 0));

 
      grow.onDown.add(this.polygon.addSide.bind(this.polygon));
      grow.onDown.add(this.draw.bind(this, game));
      shrink.onDown.add(this.polygon.removeSide.bind(this.polygon));
      shrink.onDown.add(this.draw.bind(this, game));
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
  
  Player.prototype.draw = function(game) {
    //remember old coordinates
    var x = this.sprite.x;
    var y = this.sprite.y;
    this.sprite.destroy();
    
    var bm = game.add.bitmapData(200, 200);
    bm.polygon(this.polygon, '#FFFFFF');
    this.sprite = game.add.sprite(x, y, bm);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }

  return Player;

})(Phaser);
