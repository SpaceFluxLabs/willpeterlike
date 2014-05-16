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

  Phaser.BitmapData.prototype.line = function(l, fillStyle) {
    if (typeof fillStyle !== 'undefined') {
      this.context.fillStyle = fillStyle;
    }
    var length = 50;
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, length);
    this.context.lineTo(1, length);
    this.context.lineTo(1, 0);
    this.context.closePath();
    this.context.fill();
  };

});
