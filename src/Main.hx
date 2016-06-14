package ;
import pixi.core.graphics.Graphics;
import pixi.plugins.app.Application;

class Main extends Application {
	
	public function new() {
		
		super();
		
		init();
	}
	
	function init() {
		
		width = 1024;
		height = 576;
		backgroundColor = 0x333333;
		pixelRatio = 1;
		transparent = true;
		antialias = false;
		
		onUpdate = update;
		super.start(Application.AUTO);
		
		renderer.view.style.position = 'absolute';
		renderer.view.style.left = '50%';
		renderer.view.style.top = '50%';
		renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
	}
	
	function update(elapsedTime:Float) 
	{
		
	}

	static function main() 
	{
		new Main();
	}
}