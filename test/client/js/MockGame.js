define(function() {
  var MockGame = {

    add: {
      bitmapData: jasmine.createSpy().and.returnValue(
        {
          polygon: jasmine.createSpy()
        }
      ),
      sprite: jasmine.createSpy().and.returnValue(
        {
          x: jasmine.createSpy(),
          y: jasmine.createSpy()
        }
      ),
    },

    physics: {
      enable: jasmine.createSpy()
    },
    app: {
      lines: []
    },

    input: {
      keyboard: {
        isDown: jasmine.createSpy(),

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

  }

  return MockGame;
});
