package ;

import pixi.core.display.Container;
import pixi.core.textures.Texture;
import pixi.core.sprites.Sprite;
import pixi.plugins.app.Application;

/**
 * Main game class 
 * @author Tiago Ling Alexandre
 */
class Main extends Application 
{
	var dt:Float = 0.0;
	var lastElapsed:Float = 0.0;
	var game:Game;
	
	public function new() 
	{
		super();
		init();
	}
	
	function init() 
	{
		width = 1024;
		height = 576;
		backgroundColor = 0x000000;
		pixelRatio = 1;
		transparent = true;
		antialias = false;
		onUpdate = _onUpdate;
		
		super.start(Application.AUTO);
		
		//Setting view position in browser
		renderer.view.style.position = 'absolute';
		renderer.view.style.left = '50%';
		renderer.view.style.top = '25%';
		renderer.view.style.transform = 'translate3d( -50%, -25%, 0 )';
		
		game = new Game(width, height);
		stage.addChild(game);
	}
	
	function _onUpdate(elapsedTime:Float) 
	{
		dt = (elapsedTime - lastElapsed) / 1000.0;
		lastElapsed = elapsedTime;
		
		game.update(dt);
	}

	static function main() 
	{
		new Main();
	}
}