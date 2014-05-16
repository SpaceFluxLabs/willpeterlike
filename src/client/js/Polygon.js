define(function() {
  function Polygon(x, y, sides, radius) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.radius = radius;
    this.direction = 0;
  }

  Polygon.prototype.translate = function (dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  Polygon.prototype.scale = function (factor) {
    this.radius *= factor;
  }

  Polygon.prototype.addSide = function() {
    this.sides += 1;
  }

  //Make sure polygon has at least 3 sides
  Polygon.prototype.removeSide = function () {
    this.sides > 3 ? this.sides-= 1 : this.sides = 3;
  }

  Polygon.prototype.numSides = function () {
    return this.sides;
  }
  
  Polygon.prototype.turn = function (theta, turnLeft) {
    if (turnLeft) {
      this.direction -= theta;
    } else {
      this.direction += theta;
    }
    console.log(this.direction);
  }

  return Polygon;
});
