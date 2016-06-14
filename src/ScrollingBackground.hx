package;
import pixi.core.textures.Texture;
import pixi.extras.TilingSprite;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class ScrollingBackground extends TilingSprite implements Updatable
{
	var speedX:Float;
	var speedY:Float;
	
	public function new(texture:Texture, width:Float, height:Float) 
	{
		super(texture, width, height);
		speedX = speedY = 0.0;
	}
	
	public function setSpeed(x:Float = 0.0, y:Float = 0.0)
	{
		speedX = x;
		speedY = y;
	}
	
	public function update(deltaTime:Float)
	{
		tilePosition.x += speedX * deltaTime;
		tilePosition.y += speedY * deltaTime;
	}
}