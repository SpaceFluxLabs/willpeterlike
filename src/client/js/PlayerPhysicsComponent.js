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
        ammoHandler = _.partial(self.onAmmoCollision, player),
        ammo,
        missiles = game.app.missiles,
        missileHandler = _.partial(self.onMissileCollision, player),
        missile
    ;

    ammos.forEach(function(ammo) {
      game.physics.arcade.collide(ammo.sprite, player.sprite, ammoHandler, null, self);
    });

    missiles.forEach(function(missile) {
      game.physics.arcade.collide(missile.sprite, player.sprite, missileHandler, null, self);
    });
  };

  /** 
   * Handler for when player collides with a line
   * HACK CITY - cannot grow the polygon Sprite, so we need ref to player
   * @param {Player} player - the player
   * @param {Phaser.Sprite} lineSprite - the line we're checking player against
   * @Param {Phaser.Sprite} [polygonSprite] - the player's polygon
   */
  prototype.onAmmoCollision = function(player, ammoSprite, polygonSprite) {
    ammoSprite.destroy();
    player.grow();
  };

  prototype.onMissileCollision = function(player, missileSprite, polygonSprite) {
    missileSprite.destroy();
    player.shrink();
  };

  return PlayerPhysicsComponent;
});

