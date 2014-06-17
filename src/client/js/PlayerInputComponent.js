define(['Lodash' ], function( _ ) {

  var prototype = PlayerInputComponent.prototype,
      BASE_VELOCITY = PlayerInputComponent.BASE_VELOCITY = 100,
      FRICTION = PlayerInputComponent.FRICTION = 0.95,
      ROTATION = PlayerInputComponent.ROTATION = Math.PI / 18,
      TOP_SPEED = PlayerInputComponent.TOP_SPEED = 300
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
    return FRICTION * player.polygon.speed * Math.cos(player.polygon.direction);
  }

  /**
   * Calculate the Y velocity of a player according to its direction
   * @param {Player} player - the Player to check
   */
  prototype.calcYVelocity = function(player) { 
    return FRICTION * player.polygon.speed * Math.sin(player.polygon.direction);
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
    var speed = player.polygon.speed,
        acceleration = player.polygon.acceleration,
        direction = player.polygon.direction
    ;
            
    if (keyboard.isDown(keys.W)) {
      //check if speed passes cap
      speed < TOP_SPEED ? player.polygon.setSpeed(speed + acceleration) : player.polygon.setSpeed(TOP_SPEED);    
      player.velocity.x = this.calcXVelocity(player);
      player.velocity.y = this.calcYVelocity(player);
    } else {
      //slow velocity by coefficient of friction
      player.velocity.x *= FRICTION;
      player.velocity.y *= FRICTION;
      player.polygon.setSpeed(BASE_VELOCITY);
    }

    if (keyboard.isDown(keys.A)) {
      player.polygon.turn(-ROTATION);
    } else if (keyboard.isDown(keys.D)) {
      player.polygon.turn(ROTATION);
    }
  }

  return PlayerInputComponent;
});

