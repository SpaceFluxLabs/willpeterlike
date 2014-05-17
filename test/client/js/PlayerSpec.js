define(['Player'], function(Player) {
  describe('Player Class', function() {
    // This stubs out the functions of the "Game" object
    var MockGame = { 

        add: {
          bitmapData: jasmine.createSpy().and.returnValue(
            {
              polygon: jasmine.createSpy()
            }
          ),
          sprite: jasmine.createSpy()
        },

        physics: {
          enable: jasmine.createSpy()
        },

        input: { 
          keyboard: {
            addKey: jasmine.createSpy().and.returnValue(
              {
                onDown: {
                  add: jasmine.createSpy()
                },
                onUp: {
                  add: jasmine.createSpy()
                }
              }
            )
          }
        }

      },
      // Stubs out Firebase's push method
      MockFirebase = {
        push: jasmine.createSpy()
      }
    ;

    it('should instantiate', function() {
      var id = Date.now(),
        player = new Player(id, MockGame, MockFirebase, true)
      ;

      expect(player.id).toBe(id);
      expect(player.polygon.numSides()).toBe(4);
    });

  });

});
