package;
import pixi.core.math.Point;

/**
 * @author Tiago Ling Alexandre
 */
interface Updatable 
{
	public function update(deltaTime:Float):Void;
	
	//Overlap flags
	public var type:Overlap;
	
	//Movement speed
	public var speed:Point;
	
}

enum Overlap {
	NONE;
	PICKUP;
	OBSTACLE;
	TRIGGER;
}