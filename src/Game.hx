package;
import js.Browser;
import js.html.DivElement;
import js.html.KeyboardEvent;
import pixi.core.display.Container;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.text.Text;
import pixi.core.textures.Texture;
import Updatable.Overlap;

/**
 * Contains and manages level entities and loop
 * @author Tiago Ling Alexandre
 */
class Game extends Container
{
	/**
	 * Current difficulty level
	 * Updated according to game time
	 */
	public var level:Int = 0;
	public var levelTime:Float = 0.0;
	
	var tPassed:Int = 0;
	var target:Int = 0;
	
	//Whether to run the update loop or not
	public var canRun:Bool = false;
	
	var stageWidth:Float;
	var stageHeight:Float;
	
	var player:Player;
	var ground:ScrollingBackground;
	
	var entities:Array<Updatable>;
	var counter:Text;
	var status:Text;
	
	var gameLayer:Container;
	var uiLayer:Container;
	
	public function new(stageWidth:Float, stageHeight:Float) 
	{
		super();
		
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		
		init();
	}
	
	function init()
	{
		interactive = true;
		
		entities = new Array<Updatable>();
		gameLayer = new Container();
		uiLayer = new Container();
		
		var bg = new ScrollingBackground(Texture.fromImage('assets/blue_desert.png'), 1024, 1024);
		bg.position.set(0, -330);
		bg.speed.set( -50.0, 0.0);
		entities.push(bg);
		
		ground = new ScrollingBackground(Texture.fromImage("assets/ground.png"), 1050, 70);
		ground.position.set(0, 460);
		ground.speed.set( -100.0, 0.0);
		entities.push(ground);
		
		player = new Player(0, 0, Texture.fromImage("assets/bunny.png"));
		player.position.set(256, 288);
		this.on("mousedown", onTouchStarted);
		this.on("mouseup", onTouchEnded);
		entities.push(player);
		
		var betPanel:Sprite = new Sprite(Texture.fromImage('assets/betPanel.png'));
		betPanel.position.set(0.0, 496.0);
		
		//Texts
		counter = new Text(Std.string(tPassed), { font:"40px Arial", fill:"#838796" } );
		counter.position.set(10.0, 10.0);
		
		//Keyboard player control
		Browser.document.addEventListener('keydown', onKeyDown);
		Browser.document.addEventListener('keyup', onKeyUp);
		
		gameLayer.addChild(bg);
		getRandomSequence();
		gameLayer.addChild(player);
		gameLayer.addChild(ground);
		
		uiLayer.addChild(betPanel);
		uiLayer.addChild(counter);
		
		addChild(gameLayer);
		addChild(uiLayer);
	}
	
	public function update(deltaTime:Float)
	{
		if (!canRun) return;
		
		checkCollision();
		
		for (obj in entities) obj.update(deltaTime);
		
		if (tPassed == target) getRandomSequence();
	}
	
	function getRandomSequence()
	{
		var quantity:Int = 0;
		var horizontalDistance:Float = 0.0;
		
		switch (level) {
			case 0:
				horizontalDistance = 210.0;
				quantity = Data.getRandInt(1, 2);
			case 1:
				horizontalDistance = 140.0;
				quantity = Data.getRandInt(2, 4);
			case 2:
				horizontalDistance = Data.getRandInt(0, 1) == 0 ? 140.0 : 70.0;
				quantity = horizontalDistance == 70.0 ? Data.getRandInt(2, 4) : Data.getRandInt(3, 5);
			default:
				horizontalDistance = 70.0;
				quantity = Data.getRandInt(4, 6);
		}
		
		//TODO: Use object pool
		for (i in 0...quantity) {
			var obX:Float = stageWidth + horizontalDistance * i;
			var pairPos:Point = Data.pairPositions[Data.getRandInt(0, Data.pairPositions.length - 1)];
			
			var obA:Obstacle = new Obstacle(Texture.fromImage('assets/block.png'));
			obA.activate(obX, pairPos.x, 100.0);
			gameLayer.addChild(obA);
			entities.push(obA);
			
			//Trigger
			var trigger:Trigger = new Trigger(Texture.fromImage('assets/trigger.png'));
			trigger.position.set(obX + 17.5, pairPos.y - 115.0);
			gameLayer.addChild(trigger);
			entities.push(trigger);
			
			var obB:Obstacle = new Obstacle(Texture.fromImage('assets/block.png'));
			obB.activate(obX, pairPos.y, 100.0);
			gameLayer.addChild(obB);
			entities.push(obB);
		}
		
		tPassed = 0;
		target = quantity;
		counter.text = Std.string(tPassed);
	}
	
	function checkCollision() 
	{
		var pHalfW:Float = player.width / 2;
		var pHalfH:Float = player.height / 2;
		
		//Stage bounds check (bottom and left only)
		if (player.position.x <= 0.0 && player.speed.x < 0.0) {
			player.speed.x *= -1.0;
			player.speed.x *= 0.15;
		}
		if (player.position.y + pHalfH - 10 >= ground.y && player.speed.y > 0.0) {
			player.speed.y *= -1.0;
			player.speed.y *= 0.25;
		}
		
		if (player.isDead) return;
		
		//Simple rectangle overlap check
		for (i in 0...entities.length) {
			var entity = entities[i];
			//TODO: Fix / remove the hack
			if (!Std.is(entity, Sprite)) continue;
			var spr = cast(entity, Sprite);
			if (player.position.x + pHalfW > spr.position.x && player.position.x < spr.position.x + spr.width) {
				if (player.position.y + pHalfH > spr.position.y && player.position.y < spr.position.y + spr.height) {
					switch (entity.type) {
						case Overlap.OBSTACLE:
							player.die();
							stop();
						case Overlap.PICKUP:
							
						case Overlap.TRIGGER:
							//Update text
							tPassed += 1;
							counter.text = Std.string(tPassed);
							
							//Disable the trigger once set
							spr.visible = false;
							entity.type = Overlap.NONE;
						default:
							
					}
				}		
			}
		}
	}
	
	//Stops everything in the level
	function stop()
	{
		for (e in entities) {
			if (Std.is(e, Player)) continue;
			e.speed.set(0.0, 0.0);
		}
	}
	
	//Player jump and charge handlers
	function onTouchStarted(event) 
	{
		player.chargeJump();
	}

	function onTouchEnded(event) 
	{
		player.jump();
	}
	
	function onKeyDown(e:KeyboardEvent):Void 
	{
		if (e.charCode == 0) {
			
			//Jump
			player.chargeJump();
		}
	}
	
	function onKeyUp(e:KeyboardEvent):Void 
	{
		if (e.charCode == 0) {
			
			//Jump
			player.jump();
		}
	}
}