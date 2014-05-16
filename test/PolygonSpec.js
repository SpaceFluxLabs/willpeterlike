define(['src/client/js/Polygon'], function(Polygon) {

  describe('Polygon Class', function() {

    it('should instantiate', function() {
      var poly = new Polygon(1, 2, 5, 50);
      
      expect(poly.numSides()).toBe(5);
      expect(poly.x).toBe(1);
      expect(poly.y).toBe(2);
      expect(poly.radius).toBe(50);
    });

  });

});
