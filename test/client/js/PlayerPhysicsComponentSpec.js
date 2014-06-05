define(['PlayerPhysicsComponent', 
    'Player', 
    'Phaser',
    'Mock/Game',
    'Lodash'
    ],
    function(
      Component,
      Player,
      Phaser,
      MockGame,
      _
    ) {

  describe('PlayerPhysicsComponent', function() {

    var component,
        player,
        game
    ;

    beforeEach(function() {
      component = new Component();
      player = jasmine.createSpy();
      player.grow = jasmine.createSpy();
      player.sprite = jasmine.createSpy();
      player.velocity = jasmine.createSpy();

      game = _.clone(MockGame, true);
    });

    describe('.onLineCollision', function() {
      it('should destroy the line', function() {
        var line = jasmine.createSpy()
        ;

        line.destroy = jasmine.createSpy();

        component.onLineCollision(player, line, player.sprite);
        expect(line.destroy).toHaveBeenCalled();
      });

      it('should grow the player', function() {
        var line = jasmine.createSpy()
        ;

        line.destroy = jasmine.createSpy();

        component.onLineCollision(player, line, player.sprite);
        expect(player.grow).toHaveBeenCalled();
      });
    });

    describe('.update', function() {
      it('should call onLineCollision for each line sprite', function() {
        var lines = [],
            numLines = 5,
            line 
        ;

        game.app.lines = lines;

        _.range(numLines)
         .forEach(function(index) {
           lines[index] = jasmine.createSpy();
           lines[index].sprite = jasmine.createSpy();
           lines[index].sprite.destroy = jasmine.createSpy();
         });
        
        game.physics.arcade.collide = jasmine.createSpy()
          .and.callFake(function(obj1, obj2, collideCallback, processCallback, cntxt) {
            collideCallback(obj1, obj2);
          });

        spyOn(component, 'onLineCollision');
        component.update(game, player);

        _.range(numLines)
         .forEach(function(index) {
           line = lines[index];
           expect(component.onLineCollision).toHaveBeenCalledWith(player, 
              line.sprite, player.sprite);
         });
      });

      it('should stop velocity if polygon is at TL border', function() {

        player.sprite.x = 0;
        player.sprite.y = 0;
        player.velocity.x = -100;
        player.velocity.y = -100;

        component.update(game, player);

        expect(player.velocity.x).toEqual(0);
        expect(player.velocity.y).toEqual(0);

      });

      it('should stop velocity if poly at BR border', function() {

        player.sprite.x = game.width;
        player.sprite.y = game.height;
        player.velocity.x = 100;
        player.velocity.y = 100;

        component.update(game, player);

        expect(player.velocity.x).toEqual(0);
        expect(player.velocity.y).toEqual(0);

      });
    });
  });
});
