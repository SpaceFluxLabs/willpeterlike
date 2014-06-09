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

    var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com'),
        style = { font: "25px Arial", fill: "#FFFFFF", align: "center" },
        self = this
    ;

    firebase.once('value', function(data) {

      var i = 0
      ;

      data.forEach(function(snapshot) { 

        var gameId = snapshot.name(),
            text = new Phaser.Text(self.game, 50, 50, gameId, style),
            handler = self.joinGame.bind(self, gameId),
            btn = self.game.add.button(100, 300 + i * 50, '', handler)
        ;

        text.anchor.set(0.5);
        btn.addChild(text);
        
        console.log(gameId);
        i++;
      });

    });
    
    this.game.app = {};
    this.game.add.button(100, 100, 'btn', this.createGame);


    this.game.app.firebase = firebase;

  };



  MenuState.prototype.createGame = function() {

    var id = Date.now(),
        firebase = this.game.app.firebase
    ;

    this.game.app.firebase = firebase.child(id);
    this.game.state.start('main');

  };


  MenuState.prototype.joinGame = function(gameId) {

    var firebase = this.game.app.firebase
    ;

    console.log('join ', gameId);
    this.game.app.firebase = firebase.child(gameId);
    this.game.state.start('main');
  };
  /**
   * export menu state
   */

  MenuState.prototype.shutdown = function() {

    this.game.app.firebase.off('value');
    console.log('menu shutdown');

  };
  return MenuState;
});


