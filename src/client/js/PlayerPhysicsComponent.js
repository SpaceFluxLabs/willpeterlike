define(['Lodash' ], function( _) {
  'use strict';
  
  var prototype = PlayerPhysicsComponent.prototype
  ;

  /**
   * Create a new PlayerPhysicsComponent
   * @constructor
   */
  function PlayerPhysicsComponent() {
  }

  /**
   * Update function checks if Player has any collisions per frame
   * @param {Phaser.Game} game - the game instance
   * @param {Player} player - the player to check
   */
  prototype.update = function(game, player) {

    var self = this,
        ammos = game.app.ammos,
        handler = _.partial(self.onLineCollision, player),
        ammo
    ;

    ammos.forEach(function(ammo) {
      game.physics.arcade.collide(ammo.sprite, player.sprite, handler, null, self);
    });
  };

  /** 
   * Handler for when player collides with a line
   * HACK CITY - cannot grow the polygon Sprite, so we need ref to player
   * @param {Player} player - the player
   * @param {Phaser.Sprite} lineSprite - the line we're checking player against
   * @Param {Phaser.Sprite} [polygonSprite] - the player's polygon
   */
  prototype.onLineCollision = function(player, lineSprite, polygonSprite) {
    lineSprite.destroy();
    player.grow();
  };

  return PlayerPhysicsComponent;
});

