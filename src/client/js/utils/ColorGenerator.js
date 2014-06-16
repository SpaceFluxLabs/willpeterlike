define(function() {
  var ColorGenerator = {};

  /**
   * A deterministic color generator.
   * The same input number will always generate the same output color
   * @param {number} seed - The seed number used to generate a colour
   */
  ColorGenerator.getColorFromNumber = function(seed) {
    var _24bits = Math.pow(256, 3),
        _6digitHex = 1048576, // This is the minimum number in decimals to get 100000 in hex
        decimalToHex,
        hex
    ;

    decimalToHex = Math.abs(seed) % _24bits;

    // If the number inputted is not large enough
    // to generate a 6 digit hex (for color)
    // we need to add the bare minimum digits
    if (decimalToHex < _6digitHex) {
      decimalToHex += _6digitHex;
    }

    // Converts a Number object to a string of its hexadecimal representation
    hex = decimalToHex.toString(16);

    return '#' + hex.split('').reverse().join('');
  };

  return ColorGenerator;
});
