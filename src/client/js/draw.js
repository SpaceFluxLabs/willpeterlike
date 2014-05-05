//draw starting from top left corner
function Draw(p){
  game.context.strokeStyle = 'rgb(0,0,0)';
  game.context.beginPath();
	game.context.moveTo(p.x + p.radius, p.y);
	for(var i = 1; i < p.sides + 1; i++){
	  game.context.lineTo(p.x + p.radius * Math.cos(2*Math.PI*i/p.sides), p.y + p.radius * Math.sin(2*Math.PI*i/p.sides));
	}
  game.context.stroke();
	game.context.closePath();
}
