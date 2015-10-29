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
        lines = game.app.lines,
        handler = _.partial(self.onLineCollision, player),
        topLeft = { 
          x: player.sprite.x,
          y: player.sprite.y
        },
        bottomRight = {
          x: topLeft.x + player.sprite.width,
          y: topLeft.y + player.sprite.height
        },
        topBorder = 0,
        leftBorder = 0,
        rightBorder = game.width,
        bottomBorder = game.height
    ;

    lines.forEach(function(line) {
      game.physics.arcade.collide(line.sprite, player.sprite, handler, null, self);
    });

    // Check for borders
    
    if (topLeft.x  <= leftBorder && player.velocity.x < 0) {
      player.sprite.x = leftBorder;
      player.velocity.x = 0;
    }

    if (topLeft.y <= topBorder && player.velocity.y < 0) {
      player.sprite.y = topBorder;
      player.velocity.y = 0;
    }

    if (bottomRight.x >= rightBorder && player.velocity.x > 0) {
      player.sprite.x = rightBorder - player.sprite.width;
      player.velocity.x = 0;
    }

    if (bottomRight.y >= bottomBorder && player.velocity.y > 0) {
      player.sprite.y = bottomBorder - player.sprite.height;
      player.velocity.y = 0;
    }
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

