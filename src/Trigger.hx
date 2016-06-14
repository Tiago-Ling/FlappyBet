package;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import Updatable.Overlap;
import pixi.core.textures.Texture;

/**
 * Debug graphic trigger
 * @author Tiago Ling Alexandre
 */
class Trigger extends Sprite implements Updatable
{
	public var speed:Point;
	public var isActive:Bool;
	
	public var type:Overlap;
	
	public function new(texture:Texture)
	{
		super(texture);
		init();
	}
	
	function init() 
	{
		type = Overlap.TRIGGER;
		speed = new Point(100.0, 0.0);
		isActive = true;
	}
	
	public function update(deltaTime:Float) 
	{
		if (!isActive) return;
		
		position.x -= speed.x * deltaTime;
		
		if (position.x <= -width) {
			position.set( -width, -height);
			visible = false;
			isActive = false;
		}
	}
	
}