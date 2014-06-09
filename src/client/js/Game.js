define(['Phaser',
    'Firebase',
    'Player',
    'Line',
    'Prediction',
    'states/Menu',
    'states/Main'
    ],
    function(
      Phaser,
      Firebase,
      Player,
      Line,
      Prediction,
      Menu,
      Main
    ) {
  'use strict';

  var CANVAS_WIDTH = 800,
      CANVAS_HEIGHT = 600,
      game
  ;

    var divID = 'phaser';
    //game = new Phaser.Game(CANVAS_WIDTH,CANVAS_HEIGHT,Phaser.CANVAS, divID, {preload: preload, create: create, update: update});
    game = new Phaser.Game(CANVAS_WIDTH,CANVAS_HEIGHT,Phaser.CANVAS, divID);
    game.state.add('menu', Menu);
    game.state.add('main', Main);
    
    game.state.start('menu');
});
