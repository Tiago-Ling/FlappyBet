package;
import pixi.core.display.Container;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class Game extends Container
{
	public var canRun:Bool = false;
	var stageWidth:Float;
	var stageHeight:Float;
	
	var entities:Array<Updatable>;
	
	public function new(stageWidth:Float, stageHeight:Float) 
	{
		super();
		
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		
		init();
	}
	
	function init()
	{
		entities = new Array<Updatable>();
		
		var background = new ScrollingBackground(Texture.fromImage('assets/blue_desert.png'), 1024, 1024);
		background.position.set(0, -448);
		background.setSpeed( -50.0, 0.0);
		entities.push(background);
		addChild(background);
		
		var ground = new ScrollingBackground(Texture.fromImage("assets/ground.png"), 1024, 70);
		ground.position.set(0, stageHeight - 70);
		ground.setSpeed( -100.0, 0.0);
		entities.push(ground);
		addChild(ground);
		
	}
	
	public function update(deltaTime:Float)
	{
		if (!canRun) return;
		
		for (obj in entities) obj.update(deltaTime);
	}
}