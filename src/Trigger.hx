package;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import Entity.Overlap;

/**
 * Debug graphic trigger
 * @author Tiago Ling Alexandre
 */
class Trigger extends Entity
{
	public var isActive:Bool;
	
	public function new(texture:Texture)
	{
		super(texture);
		type = Overlap.TRIGGER;
		speed = new Point(0.0, 0.0);
		isActive = false;
		visible = false;
	}
	
	override public function update(deltaTime:Float)
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
		speed.y = speedY;
		position.set(newX, newY);
		isActive = true;
		visible = true;
	}
	
}