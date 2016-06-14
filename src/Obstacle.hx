package;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import Updatable.Overlap;

/**
 * Really simple class for automatic moving objects
 * @author Tiago Ling Alexandre
 */
class Obstacle extends Sprite implements Updatable
{
	public var speed:Point;
	public var isActive:Bool;
	
	public var type:Overlap;
	
	public function new(texture:Texture) 
	{
		super(texture);
		
		isActive = false;
		type = Overlap.OBSTACLE;
		speed = new Point(100.0, 0.0);
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
	
	public function activate(newX:Float = 0.0, newY:Float = 0.0, speedX:Float = 0.0, speedY:Float = 0.0)
	{
		speed.x = speedX;
		position.set(newX, newY);
		isActive = true;
		visible = true;
	}
}