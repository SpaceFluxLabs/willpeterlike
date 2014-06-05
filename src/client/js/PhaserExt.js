/**
 * Phaser Extensions
 * 
 */

define(['Phaser'], function(Phaser) {
  'use strict';

  /** 
   * Draw a filled polygon to the BitmapData
   * @param {Polygon} poly - the polygon to draw
   * @param {string} [fillStype] - The context fillstyle
   */
  Phaser.BitmapData.prototype.polygon = function(poly, fillStyle) {
    var direction = poly.direction;

    if (typeof fillStyle !== 'undefined') {
      this.context.fillStyle = fillStyle;
    }

    this.context.beginPath();
    this.context.moveTo(poly.x + poly.radius * Math.cos(direction), poly.y + poly.radius * Math.sin(direction));

    for (var i =1; i < poly.sides + 1; i++) {
      var theta = 2*Math.PI*i/poly.sides + direction;
      this.context.lineTo(poly.x + poly.radius * Math.cos(theta), poly.y + poly.radius * Math.sin(theta));
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
