define(['Mock/Game',
    'Lodash',
    'states/Menu'
    ],
    function(
      MockGame,
      _,
      Menu
    ) {
  'use strict';

  describe('Menu State', function() {
  
    var game,
        menu
    ;

    beforeEach(function() {
      menu = new Menu();
      game = _.clone(MockGame, true);
      menu.game = game;
    });

    describe('.preload', function() {

      it('should load our images', function() {

        menu.preload();
        expect(game.load.image).toHaveBeenCalled();
      });
    });
  });

});
