package;
import howler.Howl;
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
import BettingPanel.Bet;
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
	var sounds:Array<Howl>;
	
	var gameLayer:Container;
	var uiLayer:Container;
	var menuLayer:Container;
	
	var betStatus:Int = 0;
	var chillTime:Float = 3.0;
	var betPanel:BettingPanel;
	
	//Start with player 2 because start will flip the value
	var gambler:Int = 1;
	var playerAMoney:Int = 7500;
	var playerBMoney:Int = 5000;
	var endPanel:EndPanel;
	
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
		gameLayer = new Container();
		uiLayer = new Container();
		
		sounds = new Array<Howl>();
		addSound(['assets/sounds/death.mp3', 'assets/sounds/death.ogg']);
		addSound(['assets/sounds/jump.mp3', 'assets/sounds/jump.ogg']);
		addSound(['assets/sounds/pickup.mp3', 'assets/sounds/pickup.ogg']);
		addSound(['assets/sounds/win_bet.mp3', 'assets/sounds/win_bet.ogg']);
		addSound(['assets/sounds/zagi2_gaming_arcade_loop.mp3', 'assets/sounds/zagi2_gaming_arcade_loop.ogg'], false, true);
		addSound(['assets/sounds/lose_bet.mp3', 'assets/sounds/lose_bet.ogg']);
		
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
		loader.add('endPanel', 'assets/EndPanelExport.png');
		loader.add('menuPanel', 'assets/MenuPanel.png');
		//loader.load(startGame);
		loader.load(showMenu);
	}
	
	function showMenu()
	{
		menuLayer = new Container();
		addChild(menuLayer);
		
		//Background stuff
		var bg = new ScrollingBackground(Texture.fromImage('assets/blue_desert.png'), 1024, 1024);
		bg.position.set(0, -330);
		bg.speed.set( -50.0, 0.0);
		menuLayer.addChild(bg);
		
		ground = new ScrollingBackground(Texture.fromImage("assets/ground.png"), 1050, 70);
		ground.position.set(0, 460);
		ground.speed.set( -100.0, 0.0);
		menuLayer.addChild(ground);
		
		var mainMenu = new MainMenu(Texture.fromImage('assets/MenuPanel.png'), startGame, null, null);
		mainMenu.position.set(315.0, 66.0);
		menuLayer.addChild(mainMenu);
	}
	
	function startGame()
	{
		removeChild(menuLayer);
		
		tPassed = 0;
		target = 0;
		betStatus = 0;
		chillTime = 3.0;
		
		entities = new Array<Entity>();
		
		gambler = gambler == 0 ? 1 : 0;
		
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
		player = new Player(0, 0, Texture.fromImage("assets/bunny.png"), sounds[1]);
		player.position.set(256, 288);
		entities.push(player);
		
		//UI
		betPanel = new BettingPanel(sounds[3], sounds[5], gambler, playerAMoney, playerBMoney);
		endPanel = new EndPanel(Texture.fromImage('assets/EndPanelExport.png'), resetGame);
		
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
		uiLayer.addChild(endPanel);
		addChild(gameLayer);
		addChild(uiLayer);
		
		//Keyboard player control
		Browser.document.addEventListener('keydown', onKeyDown);
		Browser.document.addEventListener('keyup', onKeyUp);
		
		canRun = true;
		sounds[4].play();
	}
	
	public function update(deltaTime:Float)
	{
		if (!canRun) return;
		
		checkCollision();
		
		for (obj in entities) obj.update(deltaTime);
		
		//Count 3 seconds after the end of a challenge before loading another one
		if (tPassed == target && !player.isDead) {
			chillTime -= deltaTime;
			if (chillTime <= 0.0) {
				var qty = getRandomChallenge();
				target = tPassed + qty;
				chillTime = 4.0;
				betPanel.openBets();
				betPanel.setBetBodyQty(qty);
			}
		}
	}
	
	/**
	 * Returns a sequence of obstacles for the current player to succeed / fail
	 * The second player will be able to bet on the outcome of the challenge
	 * @return	The number of obstacles in this challenge
	 */
	function getRandomChallenge():Int
	{
		if (player.isDead) return 0;
		
		var quantity:Int = 0;
		var horizontalDistance:Float = 0.0;
		
		//TODO: Level progression
		switch (level) {
			case 0:
				horizontalDistance = 230.0;
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
			trigger.activate(obX + 17.5, trigY, 100.0);
			
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
			if (player.isDead) {
				player.speed.y *= -1.0;
				player.speed.y *= 0.25;
			} else {
				player.die();
				stop();
				sounds[0].play();
				betPanel.setBetResult(Bet.FAIL);
				endPanel.activate(362.0, 144.0, gambler == 0 ? 2 : 1);
			}
		}
		
		if (player.isDead) return;
		
		//Simple rectangle overlap check
		for (i in 0...entities.length) {
			var entity = entities[i];
			if (player.position.x + pHalfW > entity.position.x && player.position.x < entity.position.x + entity.width) {
				if (player.position.y + pHalfH > entity.position.y && player.position.y < entity.position.y + entity.height) {
					switch (entity.type) {
						case Overlap.OBSTACLE:
							player.die();
							stop();
							sounds[0].play();
							betPanel.setBetResult(Bet.FAIL);
							endPanel.activate(362.0, 144.0, gambler == 0 ? 2 : 1);
						case Overlap.PICKUP:
							
						case Overlap.TRIGGER:
							//Update text
							tPassed += 1;
							betPanel.updateCounter(tPassed);
							
							//Disable the trigger once set
							entity.visible = false;
							entity.position.set( -entity.width, -entity.height);
							entity.isActive = false;
							entity.type = Overlap.NONE;
							
							//Suspend betting once the first trigger of the challenge is activated
							if (betStatus == 0) {
								betStatus = 1;
								betPanel.onBetPlaced();
							}
							
							betPanel.reduceBetBodyQty();
							sounds[2].play();
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
		
		sounds[4].stop();
	}
	
	function showResults()
	{
		
	}
	
	//Gets obstacle from pool
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
	
	//Get trigger from pool
	function getTrigger():Trigger
	{
		for (tr in triggerPool) {
			if (!tr.isActive) {
				trace('Will return trigger');
				return tr;
			}
		}
		
		var trigger:Trigger = new Trigger(Texture.fromImage('assets/trigger.png'));
		triggerPool.push(trigger);
		return trigger;
	}
	
	function onKeyDown(e:KeyboardEvent):Void 
	{
		if (e.keyCode == 32)
			player.chargeJump();
			
		if (e.keyCode == 27) {
			resetGame();
		}
	}
	
	function resetGame()
	{
		gameLayer.removeChildren();
		uiLayer.removeChildren();
		startGame();
	}
	
	function onKeyUp(e:KeyboardEvent):Void 
	{
		if (e.keyCode == 32)
			player.jump();
	}
	
	//Loads a sound and stores a reference to it inside the `sounds` array
	function addSound(urls:Array<String>, autoplay:Bool = false, loop:Bool = false) 
	{
		var snd:Howl = null;
		var options:HowlOptions = {
			src: urls,
			autoplay: autoplay,
			loop: loop,
			onend: function (id:Int) {
				
			}
		}
		snd = new Howl(options);
		sounds.push(snd);
	}
}