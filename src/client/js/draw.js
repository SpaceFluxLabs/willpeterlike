//draw starting from top left corner
function Draw(x, y, sides, radius, color){
	poly = game.add.graphics(0,0);
	poly.lineStyle(2, 0x0000FF, 1);
	poly.beginFill(color,1);
	poly.moveTo(x + radius, y);
	for(var i = 1; i < sides; i++){
	  poly.lineTo(x + radius * Math.cos(2*Math.PI*i/sides), y + radius * Math.sin(2*Math.PI*i/sides));
	}
	poly.endFill();
	return poly;
}
