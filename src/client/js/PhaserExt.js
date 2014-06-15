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

    var halfLength = line.lineLength / 2;
    this.context.beginPath();
    this.context.moveTo(halfLength * (Math.cos(line.direction) + 1), halfLength * (Math.sin(line.direction) + 1));
    this.context.lineTo(halfLength * (-Math.cos(line.direction) + 1), halfLength * (-Math.sin(line.direction) + 1));
    this.context.lineWidth = 1;
    this.context.stroke();
  };
});
