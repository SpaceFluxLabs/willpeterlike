define(['Lodash' ], function( _ ) {

  var prototype = PlayerInputComponent.prototype,
      BASE_VELOCITY = PlayerInputComponent.BASE_VELOCITY = 100,
      FRICTION = PlayerInputComponent.FRICTION = 0.90,
      ROTATION = PlayerInputComponent.ROTATION = Math.PI / 36,
      TOP_SPEED = PlayerInputComponent.TOP_SPEED = 400
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
    var speed = player.polygon.speed,
        acceleration = player.polygon.acceleration,
        direction = player.polygon.direction
    ;
            
    if (keyboard.isDown(keys.W)) {
      //check if speed passes cap
      speed < TOP_SPEED ? player.polygon.setSpeed(speed + acceleration) : player.polygon.setSpeed(TOP_SPEED);    
      player.velocity.x = FRICTION * speed * Math.cos(direction);
      player.velocity.y = FRICTION * speed * Math.sin(direction);       
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

