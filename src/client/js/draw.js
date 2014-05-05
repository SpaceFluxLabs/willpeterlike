//draw starting from top left corner
function Draw(p){
	poly = game.add.graphics(0,0);
	poly.lineStyle(2, 0x0000FF, 1);
	poly.beginFill(p.color,1);
	poly.moveTo(p.x + p.radius, p.y);
	for(var i = 1; i < p.sides; i++){
	  poly.lineTo(p.x + p.radius * Math.cos(2*Math.PI*i/p.sides), p.y + p.radius * Math.sin(2*Math.PI*i/p.sides));
	}
	poly.endFill();
}
