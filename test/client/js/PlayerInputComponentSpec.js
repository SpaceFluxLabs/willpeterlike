define(['PlayerInputComponent', 
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

  describe('PlayerInputComponent', function() {

    var component,
        player,
        polygon
    ;

    beforeEach(function() {
      component = new Component();
      polygon = jasmine.createSpy();
      player = jasmine.createSpy();
      polygon.direction = Math.PI / 5;
      player.polygon = polygon;
    });

    describe('.calcXVelocity', function() {
      it('should be base velocity * cos (direction)', function() {
        var x = component.calcXVelocity(player),
            direction = player.polygon.direction,
            expected = Component.BASE_VELOCITY * Math.cos(direction)
        ;

        expect(x).toEqual(expected);
      });
    });

    describe('.calcYVelocity', function() {
      it('should be base velocity * sin (direction)', function() {
        var y = component.calcYVelocity(player),
            direction = player.polygon.direction,
            expected = Component.BASE_VELOCITY * Math.sin(direction)
        ;

        expect(y).toEqual(expected);
      });
    });

    describe('.update', function() {

      var game,
          isDownSpy,
          keys
      ;

      beforeEach(function() {
        game = _.clone(MockGame, true);
        isDownSpy = game.input.keyboard.isDown;

        player.velocity = jasmine.createSpy();
        keys = Phaser.Keyboard;
        
      });

      it('should have 0 velocity if W is not down', function() { 
        isDownSpy.and.callFake(function(key) {
          if (key === keys.W) {
            return false;
          }
        });

        component.update(game, player);
        expect(player.velocity.x).toEqual(0);
        expect(player.velocity.y).toEqual(0);
      });

      it('should set forward velocity if W is down', function() {
        isDownSpy.and.callFake(function(key) {
          if (key === keys.W) {
            return true;
          }
        });

        component.update(game, player);
        expect(player.velocity.x).toEqual(component.calcXVelocity(player));
        expect(player.velocity.y).toEqual(component.calcYVelocity(player));
      });

      it('should rotate left on A', function() {
        isDownSpy.and.callFake(function(key) {
          if (key === keys.A) {
            return true;
          }
        });

        polygon.turn = jasmine.createSpy();
        component.update(game, player);
        expect(polygon.turn).toHaveBeenCalledWith(-Component.ROTATION);
      });

      it('should rotate right on D', function() {
        isDownSpy.and.callFake(function(key) {
          if (key === keys.D) {
            return true;
          }
        });

        polygon.turn = jasmine.createSpy();
        component.update(game, player);
        expect(polygon.turn).toHaveBeenCalledWith(Component.ROTATION);
      });
    });

  });
});
        
