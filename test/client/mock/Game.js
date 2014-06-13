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

    load: {
      image: jasmine.createSpy()
    },

    physics: {
      enable: jasmine.createSpy(),
      arcade: jasmine.createSpy().and.returnValue(
        {
          collide: jasmine.createSpy()
        }
      )
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
