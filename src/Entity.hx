package;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class Entity extends Sprite
{
	//Overlap flags
	public var type:Overlap;
	
	//Movement speed
	public var speed:Point;
	
	public var isActive:Bool;
	
	public function new(texture:Texture) 
	{
		super(texture);
		isActive = true;
		speed = new Point(0.0, 0.0);
	}

	public function update(deltaTime:Float)
	{
		
	}
}

enum Overlap {
	NONE;
	PICKUP;
	OBSTACLE;
	TRIGGER;
}