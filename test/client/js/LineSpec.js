define(['Line',
    'Mock/Game',
    'Mock/Firebase',
    'Lodash'
    ],
    function(Line,
      MockGame,
      MockFirebase,
      _
    ){
  describe('Line class', function() {
    var mockedGame,
        mockedFirebase,
        Line,
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
      line = new Line(mockedGame, mockedFirebase, x, y, direction, speed);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should instantiate', function() {
      expect(line.x).toBe(x);
      expect(line.y).toBe(y);
      expect(line.direction).toBe(direction);
      expect(line.speed).toBe(speed);
    });
  });
}