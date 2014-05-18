/**
 * Phaser Extensions
 * 
 */

define(['Phaser'], function(Phaser) {
  /** 
   * Draw a filled polygon to the BitmapData
   * @param {Polygon} p - the polygon to draw
   * @param {string} [fillStype] - The context fillstyle
   */
  Phaser.BitmapData.prototype.polygon = function(p, fillStyle) {
    var direction = p.direction;

    if (typeof fillStyle !== 'undefined') {
      this.context.fillStyle = fillStyle;
    }

    this.context.beginPath();
    this.context.moveTo(p.x + p.radius * Math.cos(direction), p.y + p.radius * Math.sin(direction));

    for (var i =1; i < p.sides + 1; i++) {
      var theta = 2*Math.PI*i/p.sides + direction;
      this.context.lineTo(p.x + p.radius * Math.cos(theta), p.y + p.radius * Math.sin(theta));
    }

    this.context.closePath();
    this.context.fill();

  };

  Phaser.BitmapData.prototype.line = function(line, strokeStyle) {
    if (typeof strokeStyle !== 'undefined') {
      this.context.strokeStyle = strokeStyle;
    }

    var unitVelocity = line.getUnitVelocity();
    var halfLength = line.lineLength / 2;
    this.context.beginPath();
    if (unitVelocity.x === 0 && unitVelocity.y === 0) {
      unitVelocity.x = 1;
      unitVelocity.y = 1;
    }
    this.context.moveTo(halfLength * (unitVelocity.x + 1), halfLength * (unitVelocity.y + 1));
    this.context.lineTo(halfLength * (-unitVelocity.x + 1), halfLength * (-unitVelocity.y + 1));
    this.context.lineWidth = 1;
    this.context.stroke();
  };

});
