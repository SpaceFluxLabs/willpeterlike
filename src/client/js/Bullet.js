define(['Line', 'Lodash'], function(Line, _) {
    'use strict';

    function Bullet(game, firebase, x, y) {
        Line.call(this, game, firebase, x, y);
    }

    Bullet.prototype.setVelocity = function(x, y) {
      this.velocity.x = x;
      this.velocity.y = y;
    }

    Bullet.prototype.getUnitVelocity = function() {
      var absVelocity = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y,2));
      if (absVelocity === 0) {
        return {
          x : 0,
          y : 0
        }
      } else {
        return {
          x : this.velocity.x / absVelocity,
          y : this.velocity.y / absVelocity
        }
      }
    }

    // Inherit all of Line's prototypal properties into Bullet
    Bullet.prototype = _.create(Line);

    return Bullet;
});
