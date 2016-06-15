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
import Entity.Overlap;
import pixi.loaders.Loader;

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
	
	var entities:Array<Entity>;
	var obstaclePool:Array<Obstacle>;
	var triggerPool:Array<Trigger>;
	
	var gameLayer:Container;
	var uiLayer:Container;
	
	var betStatus:Int = 0;
	var chillTime:Float = 3.0;
	var betPanel:BettingPanel;
	
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
		
		entities = new Array<Entity>();
		gameLayer = new Container();
		uiLayer = new Container();
		
		var loader:Loader = new Loader();
		loader.add('bg', 'assets/blue_desert.png');
		loader.add('ground', 'assets/ground.png');
		loader.add('player', 'assets/bunny.png');
		loader.add('block', 'assets/block.png');
		loader.add('trigger', 'assets/trigger.png');
		loader.add('panel', 'assets/betPanel.png');
		loader.add('sBtnUp', 'assets/SmallBtnUp.png');
		loader.add('sBtnDown', 'assets/SmallBtnDown.png');
		loader.add('bBtnUp', 'assets/BigBtnUp.png');
		loader.add('bBtnDown', 'assets/BigBtnDown.png');
		loader.load(function onComplete() {
			
			//Background stuff
			var bg = new ScrollingBackground(Texture.fromImage('assets/blue_desert.png'), 1024, 1024);
			bg.position.set(0, -330);
			bg.speed.set( -50.0, 0.0);
			entities.push(bg);
			
			ground = new ScrollingBackground(Texture.fromImage("assets/ground.png"), 1050, 70);
			ground.position.set(0, 460);
			ground.speed.set( -100.0, 0.0);
			entities.push(ground);
			
			//Player
			player = new Player(0, 0, Texture.fromImage("assets/bunny.png"));
			player.position.set(256, 288);
			entities.push(player);
			
			//UI
			betPanel = new BettingPanel();
			
			gameLayer.addChild(bg);
			gameLayer.addChild(player);
			
			//Obstacle and Trigger pool setup
			var poolSize:Int = 10;
			obstaclePool = new Array<Obstacle>();
			triggerPool = new Array<Trigger>();
			for (i in 0...poolSize) {
				var obA:Obstacle = new Obstacle(Texture.fromImage('assets/block.png'));
				obstaclePool.push(obA);
				entities.push(obA);
				gameLayer.addChild(obA);
				
				var obB:Obstacle = new Obstacle(Texture.fromImage('assets/block.png'));
				obstaclePool.push(obB);
				entities.push(obB);
				gameLayer.addChild(obB);
				
				var tr:Trigger = new Trigger(Texture.fromImage('assets/trigger.png'));
				triggerPool.push(tr);
				entities.push(tr);
				gameLayer.addChild(tr);
			}
			
			gameLayer.addChild(ground);
			uiLayer.addChild(betPanel);
			addChild(gameLayer);
			addChild(uiLayer);
			
			//Keyboard player control
			Browser.document.addEventListener('keydown', onKeyDown);
			Browser.document.addEventListener('keyup', onKeyUp);
			
			canRun = true;
		} );
	}
	
	public function update(deltaTime:Float)
	{
		if (!canRun) return;
		
		checkCollision();
		
		for (obj in entities) obj.update(deltaTime);
		
		if (tPassed == target) {
			chillTime -= deltaTime;
			if (chillTime <= 0.0) {
				var qty = getRandomSequence();
				target = tPassed + qty;
				chillTime = 3.0;
				betPanel.updateStatus('Betting Opened!', qty);
			}
		}
	}
	
	function getRandomSequence():Int
	{
		var quantity:Int = 0;
		var horizontalDistance:Float = 0.0;
		
		switch (level) {
			case 0:
				horizontalDistance = 230.0;
				//quantity = Data.getRandInt(1, 2);
				quantity = Data.getRandInt(2, 3);
			case 1:
				horizontalDistance = 170.0;
				quantity = Data.getRandInt(2, 4);
			case 2:
				horizontalDistance = Data.getRandInt(0, 1) == 0 ? 140.0 : 70.0;
				quantity = horizontalDistance == 70.0 ? Data.getRandInt(2, 4) : Data.getRandInt(3, 5);
			default:
				horizontalDistance = 110.0;
				quantity = Data.getRandInt(4, 6);
		}
		
		for (i in 0...quantity) {
			var obX:Float = stageWidth + horizontalDistance * i;
			var pairPos:Point = Data.pairPositions[Data.getRandInt(0, Data.pairPositions.length - 1)];
			
			var obA:Obstacle = getObstacle();
			obA.activate(obX, pairPos.x, 100.0);
			
			//Trigger
			var trigger:Trigger = getTrigger();
			//TODO: Fix this hack
			var trigY:Float = Math.abs(pairPos.y) > 1000.0 ? pairPos.x + obA.height : pairPos.y - 115.0;
			trigger.activate(obX + 17.5, trigY);
			
			var obB:Obstacle = getObstacle();
			obB.activate(obX, pairPos.y, 100.0);
		}
		
		return quantity;
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
							betPanel.updateCounter(tPassed);
							
							//Disable the trigger once set
							spr.visible = false;
							entity.type = Overlap.NONE;
							
							if (betStatus == 0) {
								betStatus = 1;
								betPanel.updateStatus('Betting Closed!', 0);
							}
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
	
	function getObstacle():Obstacle
	{
		for (ob in obstaclePool) {
			if (!ob.isActive)
				return ob;
		}
		
		var obstacle:Obstacle = new Obstacle(Texture.fromImage('assets/block.png'));
		obstaclePool.push(obstacle);
		return obstacle;
	}
	
	function getTrigger():Trigger
	{
		for (tr in triggerPool) {
			if (!tr.isActive)
				return tr;
		}
		
		var trigger:Trigger = new Trigger(Texture.fromImage('assets/trigger.png'));
		triggerPool.push(trigger);
		return trigger;
	}
	
	function onKeyDown(e:KeyboardEvent):Void 
	{
		if (e.keyCode == 32)
			player.chargeJump();
	}
	
	function onKeyUp(e:KeyboardEvent):Void 
	{
		if (e.keyCode == 32)
			player.jump();
	}
}