package ;

import pixi.core.graphics.Graphics;
import pixi.core.display.Container;
import pixi.core.textures.Texture;
import pixi.core.renderers.SystemRenderer;
import pixi.core.renderers.Detector;
import pixi.core.sprites.Sprite;
import js.Browser;
import pixi.plugins.app.Application;

class Main extends Application {
	
	var dt:Float = 0.0;
	var lastElapsed:Float = 0.0;
	var game:Game;
	
	public function new() {
		
		super();
		
		init();
	}
	
	function init() {
		
		width = 1024;
		height = 576;
		backgroundColor = 0x000000;
		pixelRatio = 1;
		transparent = true;
		antialias = false;
		
		onUpdate = _onUpdate;
		super.start(Application.AUTO);
		
		renderer.view.style.position = 'absolute';
		renderer.view.style.left = '50%';
		renderer.view.style.top = '25%';
		renderer.view.style.transform = 'translate3d( -50%, -25%, 0 )';
		
		game = new Game(width, height);
		stage.addChild(game);
		
		game.canRun = true;
	}
	
	function _onUpdate(elapsedTime:Float) {
		
		dt = (elapsedTime - lastElapsed) / 1000.0;
		lastElapsed = elapsedTime;
		
		game.update(dt);
	}

	static function main() {
		new Main();
	}
}