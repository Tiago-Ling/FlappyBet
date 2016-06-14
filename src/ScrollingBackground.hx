package;
import pixi.core.math.Point;
import pixi.core.textures.Texture;
import pixi.extras.TilingSprite;
import Updatable.Overlap;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class ScrollingBackground extends TilingSprite implements Updatable
{
	public var speed:Point;
	public var type:Overlap;
	
	public function new(texture:Texture, width:Float, height:Float) 
	{
		super(texture, width, height);
		speed = new Point(0.0, 0.0);
		
		type = Overlap.NONE;
	}
	
	public function update(deltaTime:Float)
	{
		tilePosition.x += speed.x * deltaTime;
		tilePosition.y += speed.y * deltaTime;
	}
}