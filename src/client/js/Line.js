define(['Phaser'], function(Phaser) {
  'use strict';

  function Line(game, firebase, x, y) {
    this.type = "Line";
    this.firebase = firebase;
    this.position = new Phaser.Point(x,y);
    this.velocity = new Phaser.Point(0,0);
    this.lineLength = 50;
    this.bitmap = game.add.bitmapData(this.lineLength,this.lineLength);

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
  };

  Line.prototype.serialize = function() {

    return {
        type: this.type,
        position: this.position,
        velocity: this.velocity
    };
  };

  Line.prototype.setVelocity = function(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  };

  Line.prototype.getUnitVelocity = function() {
    var absVelocity = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y,2));
    if (absVelocity === 0) {
      return {
        x : 0,
        y : 0
      };
    } else {
      return {
        x : this.velocity.x / absVelocity,
        y : this.velocity.y / absVelocity
      };
    }
  };

  Line.prototype.draw = function() {
    this.bitmap.clear();
    this.bitmap.line(this, '#FFFFFF');
  };

  return Line;
});
