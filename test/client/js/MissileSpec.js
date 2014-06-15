define(['Missile',
    'Mock/Game',
    'Mock/Firebase',
    'Lodash'
    ],
    function(Line,
      MockGame,
      MockFirebase,
      _
    ){
  describe('Missile class', function() {
    var mockedGame,
        mockedFirebase,
        Missile,
        x,
        y,
        direction,
        speed
    ;

    beforeEach(function() {
      jasmine.clock().install();
      mockedGame = _.clone(MockGame, true);
      mockedFirebase = _.clone(MockFirebase, true);

      x = 1;
      y = 2;
      direction = 3;
      speed = 4;
      missile = new Missile(mockedGame, mockedFirebase, x, y, direction, speed);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should instantiate', function() {
      expect(missile.x).toBe(x);
      expect(missile.y).toBe(y);
      expect(missile.direction).toBe(direction);
      expect(missile.speed).toBe(speed);
    });
  });
}