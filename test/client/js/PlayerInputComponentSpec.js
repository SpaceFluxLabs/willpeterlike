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
      it('should be friction * speed * cos (direction)', function() {
        var x = component.calcXVelocity(player),
            speed = player.polygon.speed,
            direction = player.polygon.direction,
            expected = Component.FRICTION * speed * Math.cos(direction)
        ;

        expect(x).toEqual(expected);
      });
    });

    describe('.calcYVelocity', function() {
      it('should be friction * speed * sin (direction)', function() {
        var y = component.calcYVelocity(player),
            speed = player.polygon.speed,
            direction = player.polygon.direction,
            expected = Component.FRICTION * speed * Math.sin(direction)
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
        polygon.setSpeed = jasmine.createSpy();
        keys = Phaser.Keyboard;
        
      });

      it('should slow object by rate of acceleration if W is not down', function() {
        isDownSpy.and.callFake(function(key) {
          if (key === keys.A) {
            return true;
          }
        });         
        
        component.update(game, player);
        tempVelocityX = player.velocity.x;
        tempVelocityY = player.velocity.y;
        
         isDownSpy.and.callFake(function(key) {
          if (key === keys.W) {
            return false;
          }
         });
         
         component.update(game, player);
         expect(tempVelocityX).toEqual(player.velocity.x * component.FRICTION);
         expect(tempVelocityY).toEqual(player.velocity.y * component.FRICTION);
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
        
