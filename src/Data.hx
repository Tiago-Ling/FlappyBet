package;
import pixi.core.math.Point;

/**
 * Multi-purpose data and utility class
 * @author Tiago Ling Alexandre
 */
class Data
{
	/**
	 * Holds all possible obstacle positions.
	 * Ordered from top to bottom
	 * Each Point holds the Y position of the top and bottom obstacles respectively
	 */
/*	public static var pairPositions:Array<Point> = [
		new Point( -35.0, 4600.0),
		new Point(-150.0, 345.0),
		new Point(-265.0, 230.0),
		new Point(-3800.0, 115.0)
	];*/ //No hidden obstacles (bug: player might pass without completing challenge)
	
	//Hidden obstacles when only one of the pair is visible
	public static var pairPositions:Array<Point> = [
		new Point( -35.0, 460.0),
		new Point(-150.0, 345.0),
		new Point(-265.0, 230.0),
		new Point(-380.0, 115.0)
	];
	
	public static var levelTimes:Array<Float> = [20.0, 15.0, 10.0, 55.0];
	
	public function new() 
	{
		
	}
	
	/**
	 * Returns a pseudo-random integer, inclusive
	 * @param	min	The minimum value
	 * @param	max	The maximum value (has to be greater than min)
	 * @return	The generated integer
	 */
	public static function getRandInt(min:Int, max:Int):Int
	{
		return min + Math.floor(((max - min + 1) * Math.random()));
	}
}