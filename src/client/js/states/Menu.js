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

    this.game.load.image('btn', 'assets/sprites/spacebar.png');
  };

  MenuState.prototype.create = function() {


    this.game.add.button(100, 100, 'btn', this.createGame);
    this.game.add.button(100, 300, 'btn', this.joinGame);

    this.game.app = {};

  };



  MenuState.prototype.createGame = function() {

    var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com'),
        id = Date.now()
    ;

    this.game.app.firebase = firebase.child(id);
    this.game.state.start('main');

  };


  MenuState.prototype.joinGame = function() {

  };
  /**
   * export menu state
   */

  return MenuState;
});


