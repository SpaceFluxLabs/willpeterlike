define(['Phaser',
    'Firebase'
    ],
    function(
      Phaser,
      Firebase
    ) {

  'use strict';

  /**
   * Create the menu state
   * @constructor 
   */
  var MenuState = function() {
  };

  MenuState.prototype.preload = function() {

    this.game.load.image('btn', 'assest/sprites/spacebar.png');
  };

  MenuState.prototype.create = function() {


    game.add.button(100, 100, 'btn', newGame);

    game.add.button(100, 300, 'btn', joinGame);

  };


  function newGame() {

  };

  function joinGame() {

  };
  /**
   * export menu state
   */

  return MenuState;
});


