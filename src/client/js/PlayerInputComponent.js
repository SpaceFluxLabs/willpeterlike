define(['Lodash' ], function( _ ) {

  var prototype = PlayerInputComponent.prototype,
      BASE_VELOCITY = PlayerInputComponent.BASE_VELOCITY = 100,
      ROTATION = PlayerInputComponent.ROTATION = Math.PI / 36
  ;

  /**
   * create new PlayerInputComponent
   * @constructor
   */
  function PlayerInputComponent() {
  }

  /**
   * Calculate the X velocity of a player according to its direction
   * @param {Player} player - the player to check
   */
  prototype.calcXVelocity = function(player) {
    return BASE_VELOCITY * Math.cos(player.polygon.direction);
  }

  /**
   * Calculate the Y velocity of a player according to its direction
   * @param {Player} player - the Player to check
   */
  prototype.calcYVelocity = function(player) {
    return BASE_VELOCITY * Math.sin(player.polygon.direction);
  }

  /**
   * Update the player according to keyboard input
   * @param {Phaser.Game} game - the game instance
   * @param {Player} game - the player to update
   */
  prototype.update = function(game, player) {

    var keyboard = game.input.keyboard,
        keys = Phaser.Keyboard
    ;

    if (keyboard.isDown(keys.W)) {
      player.velocity.x = 100 * Math.cos(player.polygon.direction);
      player.velocity.y = 100 * Math.sin(player.polygon.direction);
    } else {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }


    if (keyboard.isDown(keys.A)) {
      player.polygon.turn(-ROTATION);
    } else if (keyboard.isDown(keys.D)) {
      player.polygon.turn(ROTATION);
    }
  }

  return PlayerInputComponent;
});

