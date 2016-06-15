package;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import Entity.Overlap;

/**
 * Simple "jumper" player class 
 * @author Tiago Ling Alexandre
 */
class Player extends Entity
{
	public var jumpSpeed:Float = 8.0;
	public var maxJumpCharge:Float = 2.0;
	public var gravity:Float = 5.0;
	
	public var isDead:Bool = false;
	
	var justPressed:Bool = false;
	var jumpCharge:Float = 0.0;
	
	public function new(speedX:Float, speedY:Float, texture:Texture) 
	{
		super(texture);
		
		anchor.set(0.5, 0.5);
		speed = new Point(speedX, speedY);
		
		type = Overlap.NONE;
	}
	
	override public function update(deltaTime:Float)
	{
		position.x += speed.x;
		position.y += speed.y;
		speed.y += gravity * deltaTime;
		
		if (isDead) {
			//Turns player to give a better impression of death
			if (rotation > -Math.PI / 2) rotation -= 0.1;
			
			//Gradually reduces horizontal speed
			speed.x *= 0.99;
			
			return;
		}
		
		//Player input
		if (justPressed) {
			jumpCharge += deltaTime;
		}
	}
	
	public function chargeJump(initialCharge:Float = 0.5)
	{
		if (isDead) return;
		if (!justPressed) {
			justPressed = true;
			jumpCharge = initialCharge;
		}
	}
	
	/**
	 * Adds impulse to player
	 * @param	charge	Multiplier used to differentiate jumps
	 */
	public function jump()
	{
		if (isDead) return;
		if (jumpCharge > maxJumpCharge) jumpCharge = maxJumpCharge;
		speed.y -= (jumpSpeed * jumpCharge) + speed.y / 2;
		justPressed = false;
	}
	
	/**
	 * Adds impulse towards the top left of the screen and sets the `isDead` flag
	 */
	public function die()
	{
		speed.x = -2.0;
		speed.y = -2.0;
		isDead = true;
	}
}