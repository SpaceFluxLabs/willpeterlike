define(['Line', 'Lodash'], function(Line, _) {
  'use strict';

  function Missile(game, firebase, x, y, direction, speed) {
    Line.call(this, game, firebase, x, y, direction, speed);
    this.type = "Missile";
  }

  // Inherit all of Line's prototypal properties into Missile
  Missile.prototype = _.create(Line.prototype);

  return Missile;
});
