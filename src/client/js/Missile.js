define(['Line', 'Lodash'], function(Line, _) {
  'use strict';

  function Missile(game, firebase, x, y) {
    Line.call(this, game, firebase, x, y);
    this.type = "Missile";
  }
  
  Missile.prototype.getUnitVelocity = function() {
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

  // Inherit all of Line's prototypal properties into Missile
  Missile.prototype = _.create(Line.prototype);

  return Missile;
});
