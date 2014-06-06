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
   * Update the player according to keyboard input
   * @param {Phaser.Game} game - the game instance
   * @param {Player} game - the player to update
   */
  prototype.update = function(game, player) {

    var keyboard = game.input.keyboard,
        keys = Phaser.Keyboard
    ;

    if (keyboard.isDown(keys.W)) {
      player.velocity.x = this.calcXVelocity(player);
      player.velocity.y = this.calcYVelocity(player);
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

