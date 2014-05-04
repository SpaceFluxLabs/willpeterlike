function Polygon(edges) {
	var vertices = [];
	vertices[0] = new Vector2(0,0);
	vertices[1] = new Vector2(0,100);
	vertices[2] = new Vector2(100,0);

	this.vertices = vertices;
}