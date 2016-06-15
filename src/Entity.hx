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
	
	public function new(texture:Texture) 
	{
		super(texture);
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