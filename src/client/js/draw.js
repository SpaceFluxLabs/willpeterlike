//draw starting from top left corner
function Draw(sides, x, y, length){
	poly = game.add.graphics(0,0);
	poly.lineStyle(2, 0x0000FF, 1);
	poly.beginFill(0xFFFF00,1);
	switch(sides){
	case 3:
		poly.moveTo(x,y);
		poly.lineTo(x+length,y);
		poly.lineTo(x,y+length);
		poly.endFill();
		return poly;	
		break;
	case 4:
		poly.moveTo(x,y);
		poly.lineTo(x+length,y);
		poly.lineTo(x+length,y+length);
		poly.lineTo(x,y+length);
		poly.endFill();
		return poly;	
		break;
	default:
	}
}
