//draw starting from top left corner
function Draw(polygon){
	poly = game.add.graphics(0,0);
	poly.lineStyle(2, 0x0000FF, 1);
	poly.beginFill("#FF0000",1);
	poly.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);
	for (var i = 1; i < polygon.vertices.length; ++i) {
    poly.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
	}
	poly.endFill();
	return poly;
}
