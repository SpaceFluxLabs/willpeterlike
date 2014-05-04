function Polygon(x, y, sides, radius, color) {
	this.x = x;
	this.y = y;
	this.sides = sides;
	this.radius = radius;
	this.color = color;
}

Polygon.prototype.translate = function (dx, dy) {
  this.x+= dx;
  this.y+= dy;
}

Polygon.prototype.scale = function (factor) {
  this.radius*= factor;
}

Polygon.prototype.addSide = function(){
  this.sides++;
}

//Make sure polygon has at least 3 sides
Polygon.prototype.removeSide = function(){
  this.sides > 3 ? this.sides-= 1 : this.sides = 3;
}
