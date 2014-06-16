define(['Line', 'Lodash'], function(Line, _) {
  'use strict';

  function Ammo(game, firebase, x, y, direction) {
    Line.call(this, game, firebase, x, y, direction);
    this.type = "Ammo";
  }

  // Inherit all of Line's prototypal properties into Missile
  Ammo.prototype = _.create(Line.prototype);

  return Ammo;
});
