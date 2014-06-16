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

    describe('.onAmmoCollision', function() {
      it('should destroy the ammo', function() {
        var ammo = jasmine.createSpy()
        ;

        ammo.destroy = jasmine.createSpy();

        component.onLineCollision(player, ammo, player.sprite);
        expect(ammo.destroy).toHaveBeenCalled();
      });

      it('should grow the player', function() {
        var ammo = jasmine.createSpy()
        ;

        ammo.destroy = jasmine.createSpy();

        component.onLineCollision(player, ammo, player.sprite);
        expect(player.grow).toHaveBeenCalled();
      });
    });

    describe('.update', function() {
      it('should call onAmmoCollision for each line sprite', function() {
        var ammos = [],
            numAmmos = 5,
            ammo 
        ;

        game.app.ammos = ammos;

        _.range(numAmmos)
         .forEach(function(index) {
           ammos[index] = jasmine.createSpy();
           ammos[index].sprite = jasmine.createSpy();
           ammos[index].sprite.destroy = jasmine.createSpy();
         });
        
        game.physics.arcade.collide = jasmine.createSpy()
          .and.callFake(function(obj1, obj2, collideCallback, processCallback, cntxt) {
            collideCallback(obj1, obj2);
          });

        spyOn(component, 'onLineCollision');
        component.update(game, player);

        _.range(numAmmos)
         .forEach(function(index) {
           ammo = ammos[index];
           expect(component.onLineCollision).toHaveBeenCalledWith(player, 
              ammo.sprite, player.sprite);
         });
      });
    })
  });
});
