function Input(game) {
	if (arguments.callee._singletonInstance)
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}