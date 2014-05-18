define(['Player',
    'Mock/Game',
    'Mock/Firebase',
    ],
    function(Player,
      MockGame,
      MockFirebase
    ) {
  describe('Player Class', function() {
    it('should instantiate', function() {
      var id = Date.now(),
        player = new Player(id, MockGame, MockFirebase, true)
      ;

      expect(player.id).toBe(id);
      expect(player.polygon.numSides()).toBe(4);
    });

  });

});
