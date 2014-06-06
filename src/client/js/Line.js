define(['Phaser'], function(Phaser) {
  'use strict';

  function Line(game, firebase, x, y) {
    this.firebase = firebase;
    this.position = new Phaser.Point(x,y);
    this.velocity = new Phaser.Point(0,0);
    this.lineLength = 50;

    // Creates bitmap with dimention lineLength x lineLength
    this.bitmap = game.add.bitmapData(this.lineLength,this.lineLength);

    // Adds the bitmap to a sprite at location (x,y)
    this.sprite = game.add.sprite(x, y, this.bitmap);

    // Sets the sprite anchor to center instead of corner
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

  Line.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.line(this, '#FFFFFF');
  }

  return Line;
});
