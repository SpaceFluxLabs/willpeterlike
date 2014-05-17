define(['Polygon'], function(Polygon) {

  describe('Polygon Class', function() {
    var poly,
        x = 1,
        y = 2,
        sides = 5,
        radius = 50
    ;

    beforeEach(function() {
      poly = new Polygon(x, y, sides, radius);
    });

    it('should instantiate', function() {
      expect(poly.numSides()).toBe(sides);
      expect(poly.x).toBe(x);
      expect(poly.y).toBe(y);
      expect(poly.radius).toBe(radius);
    });

    it('should add and then remove a side', function() {
      expect(poly.numSides()).toBe(sides);
      poly.addSide();
      expect(poly.numSides()).toBe(sides + 1);
      poly.removeSide();
      expect(poly.numSides()).toBe(sides);
    });

    it('should never fall below having 3 sides', function() {
      for (var i=0; i < 5; i++) {
        poly.removeSide();
      }
      expect(poly.numSides()).toBe(3);
    });

    it('should scale its radius', function() {
      expect(poly.radius).toBe(radius);
      poly.scale(2);
      expect(poly.radius).toBe(radius * 2);
    });

    it('should turn left', function() {
      expect(poly.direction).toBe(0);
      poly.turn(-100);
      expect(poly.direction).toBe(-100);
    });

    it('should turn right', function() {
      expect(poly.direction).toBe(0);
      poly.turn(100);
      expect(poly.direction).toBe(100);
    });

  });

});
