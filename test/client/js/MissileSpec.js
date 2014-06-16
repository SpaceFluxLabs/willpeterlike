define(['Missile',
    'Mock/Game',
    'Mock/Firebase',
    'Lodash'
    ],
    function(Missile,
      MockGame,
      MockFirebase,
      _
    ){
  describe('Missile class', function() {
    var mockedGame,
        mockedFirebase,
        missile,
        x = 1,
        y = 2,
        direction = 3,
        speed = 4
    ;

    beforeEach(function() {
      jasmine.clock().install();
      mockedGame = _.clone(MockGame, true);
      mockedFirebase = _.clone(MockFirebase, true);

      missile = new Missile(mockedGame, mockedFirebase, x, y, direction, speed);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should instantiate', function() {
      expect(missile.position.x).toBe(x);
      expect(missile.position.y).toBe(y);
      expect(missile.direction).toBe(direction);
      expect(missile.speed).toBe(speed);
    });
  });
})