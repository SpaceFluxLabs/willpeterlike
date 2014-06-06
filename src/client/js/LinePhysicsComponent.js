define(['Lodash']), function( _) {
  var prototype = LinePhysicsComponent.prototype
  ;

  /**
    * Create a new LinePhysicsComponent
    * @constructor
    */
  function LinePhysicsComponent() {
  }

  /**
    * Update function checks if Line has any collisions per frame
    * @param {Phaser.Game} game - the game instance
    * @param {Line} line - the line to check
    */
  prototype.update = function(game, line) {
    var self = this
    ;

    console.log(line);
  }
    
}