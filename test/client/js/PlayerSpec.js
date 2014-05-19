define(['Player',
    'Mock/Game',
    'Mock/Firebase',
    'Lodash'
    ],
    function(Player,
      MockGame,
      MockFirebase,
      _
    ) {
  describe('Player Class', function() {

    var id = 1234,
        mockedGame,
        mockedFirebase,
        player
    ;

    beforeEach(function() {
      jasmine.clock().install();
      mockedGame = _.clone(MockGame, true);
      mockedFirebase = _.clone(MockFirebase, true);

      player = new Player(id, mockedGame, mockedFirebase, true);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should instantiate', function() {
      expect(player.id).toBe(id);
      expect(player.polygon.numSides()).toBe(4);
    });

    describe('.save', function() {

      var latency = 100
      ;

      it('should throw error if callback is not a func', function() {
        var foo = 'foo';

        expect(player.save.bind(this, latency,  foo)).toThrow();
      });

      it('should exec callback if supplied', function() {
        var foo = jasmine.createSpy();
        player.save(latency, foo);
        
        expect(foo).toHaveBeenCalled();
      });
    });

    describe('.update', function() {

      it('should call update of its inputComponent', function() {
        var input = player._inputComponent
        ;

        spyOn(input, 'update');
        player.update(mockedGame);

        expect(input.update).toHaveBeenCalledWith(mockedGame, player);
      });

      it('should call update of its physicsComponent', function() {
        var physics = player._physicsComponent
        ;

        spyOn(physics, 'update');
        player.update(mockedGame);

        expect(physics.update).toHaveBeenCalledWith(mockedGame, player);
      });
    });

  });
});
