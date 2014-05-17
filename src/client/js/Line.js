define(['Phaser'], function(Phaser) {
  function Line(game, firebase, x, y) {
    this.type = "Line";
    this.firebase = firebase;
    this.position = new Phaser.Point(x,y);
    this.velocity = new Phaser.Point(0,0);
    this.bitmap = game.add.bitmapData(1,50);

    this.sprite = game.add.sprite(x, y, this.bitmap);
    this.sprite.anchor.setTo(0.5,0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = false;
  }

  Line.prototype._save = function() {
    this.firebase.push({
        type: this.type,
        position: this.position,
        velocity: this.velocity
    });
  }

  Line.prototype.setVelocity = function(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  Line.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.line(this, '#FFFFFF');
  }

  return Line;
});
