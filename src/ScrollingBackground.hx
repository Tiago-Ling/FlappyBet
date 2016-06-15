package;
import pixi.core.math.Point;
import pixi.core.textures.Texture;
import pixi.extras.TilingSprite;
import Entity.Overlap;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class ScrollingBackground extends Entity
{
	var tSpr:TilingSprite;
	
	public function new(texture:Texture, width:Float, height:Float)
	{
		super(null);
		
		speed = new Point(0.0, 0.0);
		type = Overlap.NONE;
		
		tSpr = new TilingSprite(texture, width, height);
		addChild(tSpr);
	}
	
	override public function update(deltaTime:Float)
	{
		tSpr.tilePosition.x += speed.x * deltaTime;
		tSpr.tilePosition.y += speed.y * deltaTime;
	}
}