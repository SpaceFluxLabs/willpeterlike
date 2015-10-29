define(['utils/ColorGenerator'], function(ColorGenerator) {

  describe('ColorGenerator utility library', function() {

    it('should deterministically generate a color from a seed number', function() {
      expect(ColorGenerator.getColorFromNumber(1400318980617)).toBe('#902f38');
      expect(ColorGenerator.getColorFromNumber(1)).toBe('#100001');
      expect(ColorGenerator.getColorFromNumber(Math.pow(256,3))).toBe('#000001');
    });

    it('should handle negative seeds', function() {
      expect(ColorGenerator.getColorFromNumber(-1400318980617)).toBe('#902f38');
      expect(ColorGenerator.getColorFromNumber(-Math.pow(256,3))).toBe('#000001');
      expect(ColorGenerator.getColorFromNumber(-1)).toBe('#100001');
    });

  });

});
