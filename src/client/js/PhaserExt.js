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

    if (typeof fillStyle !== 'undefined') {
      this.context.fillStyle = fillStyle;
    }

    this.context.beginPath();
    this.context.moveTo(p.x + p.radius, p.y);

    for (var i =1; i < p.sides + 1; i++) {
      this.context.lineTo(p.x + p.radius * Math.cos(2*Math.PI*i/p.sides), p.y + p.radius * Math.sin(2*Math.PI*i/p.sides));
    }

    this.context.closePath();
    this.context.fill();

  };
});
