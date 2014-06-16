define(['Phaser'], function(Phaser) {
  'use strict';

  function Line(game, firebase, x, y, direction) {
    this.type = "Line"
    this.firebase = firebase;
    this.position = new Phaser.Point(x,y);
    this.direction = direction;
    this.speed = 0;
    this.lineLength = 50;

    // Creates bitmap with dimention lineLength x lineLength
    this.bitmap = game.add.bitmapData(this.lineLength,this.lineLength);

    // Adds the bitmap to a sprite at location (x,y)
    this.sprite = game.add.sprite(x, y, this.bitmap);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Sets the sprite anchor to center instead of corner
    this.sprite.anchor.setTo(0.5,0.5);
  }

  Line.prototype.setColor = function(color) {
    this.color = color;
  }

  Line.prototype.save = function() {
    this.firebase.push({
        type: this.type,
        position: this.position,
        direction: this.direction,
        speed: this.speed
    });
  }
  
  Line.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.line(this, "#FFFFFF");
  }

  return Line;
});
