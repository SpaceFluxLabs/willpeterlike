define(['Lodash' ], function( _ ) { 
  'use strict';

  var Prediction = {};

  /**
   * The time in which to correct position, in ms
   */
  Prediction.ADJUST_TIME = 400;

  /**
   * The margin of error we can live with, in pixels
   */
  Prediction.TOLERANCE = 2;

  /**
   * TODO: need a way to handle drifting better
   *
   * Adjust a player's position based on received packet
   * @param {Number} latency - total latency between A & B in ms
   * @param {Player} player - the player to adjust
   * @param {Object} packet - A hash of game state received
   *                            .velocity: an {x, y} of velocity
   *                            .coordinates: an {x, y} of coordinates
   */
  Prediction.adjust = function(latency, player, packet) {
    clearTimeout(this.timeout);

    var sentPosition = packet.coordinates,
        sentVelocity = packet.velocity,
        currentPosition = {
          x: player.sprite.x,
          y: player.sprite.y
        },
        latencyInSeconds = latency / 1000,
        body = player.sprite.body,
        adjustTimeInSeconds = Prediction.ADJUST_TIME / 1000,
        targetPosition = {},
        adjustX,
        adjustY,
        diffX,
        diffY
    ;

    // targetPosition is where we think the other polygon is right now
    targetPosition.x = sentPosition.x + sentVelocity.x * latencyInSeconds;
    targetPosition.y = sentPosition.y + sentVelocity.y * latencyInSeconds;

    diffX = targetPosition.x - currentPosition.x;
    diffY = targetPosition.y - currentPosition.y;

    /**
     * If we're current close to estimate, just continue at same velocity
     * Else, adjust velocity so that we catch-up within ADJUST_TIME
     */
   
    body.velocity.x = Math.abs(diffX) < Prediction.TOLERANCE 
                    ? sentVelocity.x
                    : sentVelocity.x + (diffX / adjustTimeInSeconds);

    body.velocity.y = Math.abs(diffY) < Prediction.TOLERANCE 
                    ? sentVelocity.y
                    : sentVelocity.y + (diffY / adjustTimeInSeconds);


    // Set velocity to equal sent velocity upon reaching predicted location
    this.timeout = setTimeout(function() {
      player.sprite.body.velocity.x = sentVelocity.x;
      player.sprite.body.velocity.y = sentVelocity.y;
    }, Prediction.ADJUST_TIME);

  };

  return Prediction;

});
