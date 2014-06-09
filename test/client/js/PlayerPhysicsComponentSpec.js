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
      //game = jasmine.createSpy();

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
    })
  });
});