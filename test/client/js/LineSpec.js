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
        line,
        x = 1,
        y = 2,
        direction = 3
    ;

    beforeEach(function() {
      mockedGame = _.clone(MockGame, true);
      mockedFirebase = _.clone(MockFirebase, true);

      line = new Line(mockedGame, mockedFirebase, x, y, direction);
    });

    it('should instantiate', function() {
      expect(line.position.x).toBe(x);
      expect(line.position.y).toBe(y);
      expect(line.direction).toBe(direction);
      expect(line.speed).toBe(0);
    });
  });
})