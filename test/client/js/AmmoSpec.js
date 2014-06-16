define(['Ammo',
    'Mock/Game',
    'Mock/Firebase',
    'Lodash'
    ],
    function(Ammo,
      MockGame,
      MockFirebase,
      _
    ){
  describe('Ammo class', function() {
    var mockedGame,
        mockedFirebase,
        ammo,
        x = 1,
        y = 2,
        direction = 3
    ;

    beforeEach(function() {
      jasmine.clock().install();
      mockedGame = _.clone(MockGame, true);
      mockedFirebase = _.clone(MockFirebase, true);

      ammo = new Ammo(mockedGame, mockedFirebase, x, y, direction);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should instantiate', function() {
      expect(ammo.position.x).toBe(x);
      expect(ammo.position.y).toBe(y);
      expect(ammo.direction).toBe(direction);
      expect(ammo.speed).toBe(0);
    });
  });
})