(function (console, $hx_exports) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BettingPanel = function(betSuccess,betFail,gambler,pMoney,gMoney) {
	PIXI.Container.call(this);
	this.betSuccess = betSuccess;
	this.betFail = betFail;
	this.gambler = gambler;
	this.pPlayingMoney = pMoney;
	this.pGamblingMoney = gMoney;
	this.init();
};
BettingPanel.__name__ = true;
BettingPanel.__super__ = PIXI.Container;
BettingPanel.prototype = $extend(PIXI.Container.prototype,{
	init: function() {
		this.betAmount = 0;
		var betPanel = new PIXI.Sprite(PIXI.Texture.fromImage("assets/betPanel.png"));
		betPanel.position.set(0.0,496.0);
		this.addChild(betPanel);
		this.lowerBet = new Button(PIXI.Texture.fromImage("assets/SmallBtnUp.png"),PIXI.Texture.fromImage("assets/SmallBtnDown.png"),"-",new PIXI.Point(0.0,-2.0));
		this.lowerBet.position.set(549.0,512.0);
		this.lowerBet.on("click",$bind(this,this.onBetLowered));
		this.addChild(this.lowerBet);
		this.raiseBet = new Button(PIXI.Texture.fromImage("assets/SmallBtnUp.png"),PIXI.Texture.fromImage("assets/SmallBtnDown.png"),"+");
		this.raiseBet.position.set(744.0,512.0);
		this.raiseBet.on("click",$bind(this,this.onBetRaised));
		this.addChild(this.raiseBet);
		this.placeBet = new Button(PIXI.Texture.fromImage("assets/BigBtnUp.png"),PIXI.Texture.fromImage("assets/BigBtnDown.png"),"Place Bet");
		this.placeBet.position.set(819.0,512.0);
		this.placeBet.on("click",$bind(this,this.onBetPlaced));
		this.addChild(this.placeBet);
		this.topPlayer = new PIXI.Text("Player 1",{ font : "bold 28px Arial", fill : "#333333"});
		this.topPlayer.position.set(10.0,10.0);
		this.addChild(this.topPlayer);
		this.tpMoney = new PIXI.Text("$" + Std.string(this.pPlayingMoney),{ font : "bold 24px Arial", fill : "#333333"});
		this.tpMoney.position.set(10.0,41.0);
		this.addChild(this.tpMoney);
		this.counter = new PIXI.Text("0",{ font : "bold 28px Arial", fill : "#333333"});
		this.counter.position.set(994.0,10.0);
		this.addChild(this.counter);
		this.bottomPlayer = new PIXI.Text("Player 2",{ font : "bold 28px Arial", fill : "#333333"});
		this.bottomPlayer.position.set(10.0,504.0);
		this.addChild(this.bottomPlayer);
		this.bpMoney = new PIXI.Text("$" + Std.string(this.pGamblingMoney),{ font : "bold 24px Arial", fill : "#333333"});
		this.bpMoney.position.set(10.0,535.0);
		this.addChild(this.bpMoney);
		this.status = new PIXI.Text("Waiting for New Challenge",{ font : "bold 28px Arial", fill : "#333333"});
		this.status.style.align = "center";
		this.status.position.set(512.0,10.0);
		this.status.anchor.set(0.5,0.0);
		this.addChild(this.status);
		this.betTitle = new PIXI.Text("Current Bet",{ font : "bold 13px Arial", fill : "#333333"});
		this.betTitle.position.set(298.0,512.0);
		this.addChild(this.betTitle);
		this.betBody = new PIXI.Text("No Challenge",{ font : "24px Arial", fill : "#333333"});
		this.betBody.position.set(185.0,530.0);
		this.addChild(this.betBody);
		this.amountTitle = new PIXI.Text("Amount",{ font : "13px Arial", fill : "#333333"});
		this.amountTitle.position.set(650.0,512.0);
		this.addChild(this.amountTitle);
		this.amountBody = new PIXI.Text("$" + Std.string(this.betAmount),{ font : "bold 24px Arial", fill : "#333333"});
		this.amountBody.position.set(635.0,530.0);
		this.addChild(this.amountBody);
		if(this.gambler == 0) {
			this.topPlayer.text = "Player 1";
			this.bottomPlayer.text = "Player 2";
			this.tpMoney.text = "$" + Std.string(this.pGamblingMoney);
			this.bpMoney.text = "$" + Std.string(this.pPlayingMoney);
		} else {
			this.topPlayer.text = "Player 2";
			this.bottomPlayer.text = "Player 1";
			this.tpMoney.text = "$" + Std.string(this.pPlayingMoney);
			this.bpMoney.text = "$" + Std.string(this.pGamblingMoney);
		}
	}
	,onBetPlaced: function() {
		this.amountBody.style.fill = "#FF0000";
		this.amountBody.text = "$" + Std.string(this.betAmount);
		this.amountTitle.style.fill = "#FF0000";
		this.amountTitle.text = "Amount";
		if(this.betAmount == 0) {
			this.betAmount = 500;
			this.amountBody.text = "$" + Std.string(this.betAmount);
		}
		this.lowerBet.setEnabled(false);
		this.raiseBet.setEnabled(false);
		this.placeBet.setEnabled(false);
		this.betChoice = this.currentBet;
		this.updateStatus("Bet Placed! Awaiting Results...");
	}
	,openBets: function() {
		this.amountBody.style.fill = "#333333";
		this.amountBody.text = this.amountBody.text;
		this.amountTitle.style.fill = "#333333";
		this.betAmount = 0;
		this.amountBody.text = "$" + Std.string(this.betAmount);
		this.lowerBet.setEnabled(true);
		this.raiseBet.setEnabled(true);
		this.placeBet.setEnabled(true);
		this.updateStatus("Place your Bet!");
	}
	,onBetLowered: function() {
		this.betAmount -= 500;
		this.amountBody.text = "$" + Std.string(this.betAmount);
	}
	,onBetRaised: function() {
		this.betAmount += 500;
		this.amountBody.text = "$" + Std.string(this.betAmount);
	}
	,updatePlayingMoney: function(value) {
		this.pPlayingMoney += value;
		this.tpMoney.text = "$" + Std.string(this.pPlayingMoney);
	}
	,updateGamblingMoney: function(value) {
		this.pGamblingMoney += value;
		this.bpMoney.text = "$" + Std.string(this.pGamblingMoney);
	}
	,updateCounter: function(value) {
		if(value == null) this.counter.text = "null"; else this.counter.text = "" + value;
	}
	,updateStatus: function(text) {
		this.status.text = text;
	}
	,setBetBodyQty: function(qty) {
		if(Math.random() > 0.5) {
			this.betBody.text = "Will fail in one of the next " + qty + "!";
			this.currentBet = Bet.FAIL;
		} else {
			this.betBody.text = "Will pass through the next " + qty + "!";
			this.currentBet = Bet.SUCCESS;
		}
	}
	,reduceBetBodyQty: function() {
		var qty = Std.parseInt(HxOverrides.substr(this.betBody.text,this.betBody.text.length - 2,1));
		if(qty > 0) qty = qty - 1; else qty = 0;
		if(this.currentBet == Bet.SUCCESS) this.betBody.text = "Will pass through the next " + qty + "!"; else if(this.currentBet == Bet.FAIL) this.betBody.text = "Will fail in one of the next " + qty + "!";
		if(qty == 0) {
			this.setBetResult(Bet.SUCCESS);
			this.betBody.text = "No Challenge";
		}
	}
	,setBetResult: function(res) {
		if(res == this.betChoice) {
			this.updateGamblingMoney(this.betAmount * 2);
			this.updatePlayingMoney(-this.betAmount);
			this.betSuccess.play();
			this.updateStatus("Player " + (this.gambler + 1) + " Wins!");
		} else {
			this.updatePlayingMoney(this.betAmount);
			this.updateGamblingMoney(-this.betAmount);
			this.betFail.play();
			var winner;
			if(this.gambler == 0) winner = 2; else winner = 1;
			this.updateStatus("Player " + winner + " Wins!");
		}
	}
	,togglePlayers: function() {
		if(this.gambler > 0) this.gambler = 0; else this.gambler = 1;
		if(this.gambler == 0) {
			this.topPlayer.text = "Player 2";
			this.bottomPlayer.text = "Player 1";
		} else {
			this.topPlayer.text = "Player 1";
			this.bottomPlayer.text = "Player 2";
		}
		var temp = this.pPlayingMoney;
		this.pPlayingMoney = this.pGamblingMoney;
		this.pGamblingMoney = temp;
		this.tpMoney.text = "$" + Std.string(this.pPlayingMoney);
		this.bpMoney.text = "$" + Std.string(this.pGamblingMoney);
	}
	,__class__: BettingPanel
});
var Bet = { __ename__ : true, __constructs__ : ["NO_BET","SUCCESS","FAIL"] };
Bet.NO_BET = ["NO_BET",0];
Bet.NO_BET.toString = $estr;
Bet.NO_BET.__enum__ = Bet;
Bet.SUCCESS = ["SUCCESS",1];
Bet.SUCCESS.toString = $estr;
Bet.SUCCESS.__enum__ = Bet;
Bet.FAIL = ["FAIL",2];
Bet.FAIL.toString = $estr;
Bet.FAIL.__enum__ = Bet;
var Entity = function(texture) {
	PIXI.Sprite.call(this,texture);
	this.isActive = true;
	this.speed = new PIXI.Point(0.0,0.0);
};
Entity.__name__ = true;
Entity.__super__ = PIXI.Sprite;
Entity.prototype = $extend(PIXI.Sprite.prototype,{
	update: function(deltaTime) {
	}
	,__class__: Entity
});
var Button = function(upTex,downTex,txt,offset) {
	Entity.call(this,upTex);
	this.upTex = upTex;
	this.downTex = downTex;
	this.buttonMode = true;
	this.interactive = true;
	if(offset == null) offset = new PIXI.Point(0.0,0.0);
	this.label = new PIXI.Text(txt,{ font : "bold 28px Arial", fill : "#333333"});
	this.label.position.set(this.width / 2 - this.label.width / 2 + offset.x,this.height / 2 - this.label.height / 2 + offset.y);
	this.addChild(this.label);
	this.on("mousedown",$bind(this,this.onDown));
	this.on("mouseup",$bind(this,this.onUp));
	this.on("mouseupoutside",$bind(this,this.onUp));
};
Button.__name__ = true;
Button.__super__ = Entity;
Button.prototype = $extend(Entity.prototype,{
	update: function(deltaTime) {
	}
	,setText: function(txt) {
		this.label.text = txt;
	}
	,setEnabled: function(value) {
		if(value) this.tint = 16777215; else this.tint = 10066329;
		this.interactive = value;
		this.buttonMode = value;
	}
	,onDown: function(e) {
		this.texture = this.downTex;
		this.position.y += 4.0;
	}
	,onUp: function(e) {
		this.texture = this.upTex;
		this.position.y -= 4.0;
	}
	,__class__: Button
});
var Data = function() {
};
Data.__name__ = true;
Data.getRandInt = function(min,max) {
	return min + Math.floor((max - min + 1) * Math.random());
};
Data.prototype = {
	__class__: Data
};
var EndPanel = function(texture,cBack) {
	Entity.call(this,texture);
	this.cBack = cBack;
	this.isActive = false;
	this.visible = false;
	this.init();
};
EndPanel.__name__ = true;
EndPanel.__super__ = Entity;
EndPanel.prototype = $extend(Entity.prototype,{
	init: function() {
		this.result = new PIXI.Text("Get Ready Player X!",{ font : "bold 28px Arial", fill : "#333333"});
		this.result.position.set(15.0,15.0);
		this.addChild(this.result);
		this.confirm = new Button(PIXI.Texture.fromImage("assets/BigBtnUp.png"),PIXI.Texture.fromImage("assets/BigBtnDown.png"),"Play");
		this.confirm.position.set(55.0,64.0);
		this.confirm.on("click",$bind(this,this.onConfirmDown));
		this.addChild(this.confirm);
	}
	,onConfirmDown: function() {
		if(this.cBack != null) this.cBack();
	}
	,activate: function(newX,newY,nextPlayer) {
		if(newY == null) newY = 0.0;
		if(newX == null) newX = 0.0;
		this.result.text = "Get Ready Player " + nextPlayer + "!";
		this.position.set(newX,newY);
		this.isActive = true;
		this.visible = true;
	}
	,__class__: EndPanel
});
var Overlap = { __ename__ : true, __constructs__ : ["NONE","PICKUP","OBSTACLE","TRIGGER"] };
Overlap.NONE = ["NONE",0];
Overlap.NONE.toString = $estr;
Overlap.NONE.__enum__ = Overlap;
Overlap.PICKUP = ["PICKUP",1];
Overlap.PICKUP.toString = $estr;
Overlap.PICKUP.__enum__ = Overlap;
Overlap.OBSTACLE = ["OBSTACLE",2];
Overlap.OBSTACLE.toString = $estr;
Overlap.OBSTACLE.__enum__ = Overlap;
Overlap.TRIGGER = ["TRIGGER",3];
Overlap.TRIGGER.toString = $estr;
Overlap.TRIGGER.__enum__ = Overlap;
var Game = function(stageWidth,stageHeight) {
	this.playerBMoney = 5000;
	this.playerAMoney = 7500;
	this.gambler = 1;
	this.chillTime = 3.0;
	this.betStatus = 0;
	this.canRun = false;
	this.target = 0;
	this.tPassed = 0;
	this.levelTime = 0.0;
	this.level = 0;
	PIXI.Container.call(this);
	this.stageWidth = stageWidth;
	this.stageHeight = stageHeight;
	this.init();
};
Game.__name__ = true;
Game.__super__ = PIXI.Container;
Game.prototype = $extend(PIXI.Container.prototype,{
	init: function() {
		this.interactive = true;
		this.gameLayer = new PIXI.Container();
		this.uiLayer = new PIXI.Container();
		this.sounds = [];
		this.addSound(["assets/sounds/death.mp3","assets/sounds/death.ogg"]);
		this.addSound(["assets/sounds/jump.mp3","assets/sounds/jump.ogg"]);
		this.addSound(["assets/sounds/pickup.mp3","assets/sounds/pickup.ogg"]);
		this.addSound(["assets/sounds/win_bet.mp3","assets/sounds/win_bet.ogg"]);
		this.addSound(["assets/sounds/zagi2_gaming_arcade_loop.mp3","assets/sounds/zagi2_gaming_arcade_loop.ogg"],false,true);
		this.addSound(["assets/sounds/lose_bet.mp3","assets/sounds/lose_bet.ogg"]);
		var loader = new PIXI.loaders.Loader();
		loader.add("bg","assets/blue_desert.png");
		loader.add("ground","assets/ground.png");
		loader.add("player","assets/bunny.png");
		loader.add("block","assets/block.png");
		loader.add("trigger","assets/trigger.png");
		loader.add("panel","assets/betPanel.png");
		loader.add("sBtnUp","assets/SmallBtnUp.png");
		loader.add("sBtnDown","assets/SmallBtnDown.png");
		loader.add("bBtnUp","assets/BigBtnUp.png");
		loader.add("bBtnDown","assets/BigBtnDown.png");
		loader.add("endPanel","assets/EndPanelExport.png");
		loader.add("menuPanel","assets/MenuPanel.png");
		loader.load($bind(this,this.showMenu));
	}
	,showMenu: function() {
		this.menuLayer = new PIXI.Container();
		this.addChild(this.menuLayer);
		var bg = new ScrollingBackground(PIXI.Texture.fromImage("assets/blue_desert.png"),1024,1024);
		bg.position.set(0,-330);
		bg.speed.set(-50.0,0.0);
		this.menuLayer.addChild(bg);
		this.ground = new ScrollingBackground(PIXI.Texture.fromImage("assets/ground.png"),1050,70);
		this.ground.position.set(0,460);
		this.ground.speed.set(-100.0,0.0);
		this.menuLayer.addChild(this.ground);
		var mainMenu = new MainMenu(PIXI.Texture.fromImage("assets/MenuPanel.png"),$bind(this,this.startGame),null,null);
		mainMenu.position.set(315.0,66.0);
		this.menuLayer.addChild(mainMenu);
	}
	,startGame: function() {
		this.removeChild(this.menuLayer);
		this.tPassed = 0;
		this.target = 0;
		this.betStatus = 0;
		this.chillTime = 3.0;
		this.entities = [];
		if(this.gambler == 0) this.gambler = 1; else this.gambler = 0;
		var bg = new ScrollingBackground(PIXI.Texture.fromImage("assets/blue_desert.png"),1024,1024);
		bg.position.set(0,-330);
		bg.speed.set(-50.0,0.0);
		this.entities.push(bg);
		this.ground = new ScrollingBackground(PIXI.Texture.fromImage("assets/ground.png"),1050,70);
		this.ground.position.set(0,460);
		this.ground.speed.set(-100.0,0.0);
		this.entities.push(this.ground);
		this.player = new Player(0,0,PIXI.Texture.fromImage("assets/bunny.png"),this.sounds[1]);
		this.player.position.set(256,288);
		this.entities.push(this.player);
		this.betPanel = new BettingPanel(this.sounds[3],this.sounds[5],this.gambler,this.playerAMoney,this.playerBMoney);
		this.endPanel = new EndPanel(PIXI.Texture.fromImage("assets/EndPanelExport.png"),$bind(this,this.resetGame));
		this.gameLayer.addChild(bg);
		this.gameLayer.addChild(this.player);
		var poolSize = 10;
		this.obstaclePool = [];
		this.triggerPool = [];
		var _g = 0;
		while(_g < poolSize) {
			var i = _g++;
			var obA = new Obstacle(PIXI.Texture.fromImage("assets/block.png"));
			this.obstaclePool.push(obA);
			this.entities.push(obA);
			this.gameLayer.addChild(obA);
			var obB = new Obstacle(PIXI.Texture.fromImage("assets/block.png"));
			this.obstaclePool.push(obB);
			this.entities.push(obB);
			this.gameLayer.addChild(obB);
			var tr = new Trigger(PIXI.Texture.fromImage("assets/trigger.png"));
			this.triggerPool.push(tr);
			this.entities.push(tr);
			this.gameLayer.addChild(tr);
		}
		this.gameLayer.addChild(this.ground);
		this.uiLayer.addChild(this.betPanel);
		this.uiLayer.addChild(this.endPanel);
		this.addChild(this.gameLayer);
		this.addChild(this.uiLayer);
		window.document.addEventListener("keydown",$bind(this,this.onKeyDown));
		window.document.addEventListener("keyup",$bind(this,this.onKeyUp));
		this.canRun = true;
		this.sounds[4].play();
	}
	,update: function(deltaTime) {
		if(!this.canRun) return;
		this.checkCollision();
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.update(deltaTime);
		}
		if(this.tPassed == this.target && !this.player.isDead) {
			this.chillTime -= deltaTime;
			if(this.chillTime <= 0.0) {
				var qty = this.getRandomChallenge();
				this.target = this.tPassed + qty;
				this.chillTime = 4.0;
				this.betPanel.openBets();
				this.betPanel.setBetBodyQty(qty);
			}
		}
	}
	,getRandomChallenge: function() {
		if(this.player.isDead) return 0;
		var quantity = 0;
		var horizontalDistance = 0.0;
		var _g = this.level;
		switch(_g) {
		case 0:
			horizontalDistance = 230.0;
			quantity = Data.getRandInt(2,3);
			break;
		case 1:
			horizontalDistance = 170.0;
			quantity = Data.getRandInt(2,4);
			break;
		case 2:
			if(Data.getRandInt(0,1) == 0) horizontalDistance = 140.0; else horizontalDistance = 70.0;
			if(horizontalDistance == 70.0) quantity = Data.getRandInt(2,4); else quantity = Data.getRandInt(3,5);
			break;
		default:
			horizontalDistance = 110.0;
			quantity = Data.getRandInt(4,6);
		}
		var _g1 = 0;
		while(_g1 < quantity) {
			var i = _g1++;
			var obX = this.stageWidth + horizontalDistance * i;
			var pairPos = Data.pairPositions[Data.getRandInt(0,Data.pairPositions.length - 1)];
			var obA = this.getObstacle();
			obA.activate(obX,pairPos.x,100.0);
			var trigger = this.getTrigger();
			var trigY;
			if(Math.abs(pairPos.y) > 1000.0) trigY = pairPos.x + obA.height; else trigY = pairPos.y - 115.0;
			trigger.activate(obX + 17.5,trigY,100.0);
			var obB = this.getObstacle();
			obB.activate(obX,pairPos.y,100.0);
		}
		return quantity;
	}
	,checkCollision: function() {
		var pHalfW = this.player.width / 2;
		var pHalfH = this.player.height / 2;
		if(this.player.position.x <= 0.0 && this.player.speed.x < 0.0) {
			this.player.speed.x *= -1.0;
			this.player.speed.x *= 0.15;
		}
		if(this.player.position.y + pHalfH - 10 >= this.ground.y && this.player.speed.y > 0.0) {
			if(this.player.isDead) {
				this.player.speed.y *= -1.0;
				this.player.speed.y *= 0.25;
			} else {
				this.player.die();
				this.stop();
				this.sounds[0].play();
				this.betPanel.setBetResult(Bet.FAIL);
				this.endPanel.activate(362.0,144.0,this.gambler == 0?2:1);
			}
		}
		if(this.player.isDead) return;
		var _g1 = 0;
		var _g = this.entities.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entity = this.entities[i];
			if(this.player.position.x + pHalfW > entity.position.x && this.player.position.x < entity.position.x + entity.width) {
				if(this.player.position.y + pHalfH > entity.position.y && this.player.position.y < entity.position.y + entity.height) {
					var _g2 = entity.type;
					switch(_g2[1]) {
					case 2:
						this.player.die();
						this.stop();
						this.sounds[0].play();
						this.betPanel.setBetResult(Bet.FAIL);
						this.endPanel.activate(362.0,144.0,this.gambler == 0?2:1);
						break;
					case 1:
						break;
					case 3:
						this.tPassed += 1;
						this.betPanel.updateCounter(this.tPassed);
						entity.visible = false;
						entity.position.set(-entity.width,-entity.height);
						entity.isActive = false;
						entity.type = Overlap.NONE;
						if(this.betStatus == 0) {
							this.betStatus = 1;
							this.betPanel.onBetPlaced();
						}
						this.betPanel.reduceBetBodyQty();
						this.sounds[2].play();
						break;
					default:
					}
				}
			}
		}
	}
	,stop: function() {
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(e,Player)) continue;
			e.speed.set(0.0,0.0);
		}
		this.sounds[4].stop();
	}
	,showResults: function() {
	}
	,getObstacle: function() {
		var _g = 0;
		var _g1 = this.obstaclePool;
		while(_g < _g1.length) {
			var ob = _g1[_g];
			++_g;
			if(!ob.isActive) return ob;
		}
		var obstacle = new Obstacle(PIXI.Texture.fromImage("assets/block.png"));
		this.obstaclePool.push(obstacle);
		return obstacle;
	}
	,getTrigger: function() {
		var _g = 0;
		var _g1 = this.triggerPool;
		while(_g < _g1.length) {
			var tr = _g1[_g];
			++_g;
			if(!tr.isActive) {
				console.log("Will return trigger");
				return tr;
			}
		}
		var trigger = new Trigger(PIXI.Texture.fromImage("assets/trigger.png"));
		this.triggerPool.push(trigger);
		return trigger;
	}
	,onKeyDown: function(e) {
		if(e.keyCode == 32) this.player.chargeJump();
		if(e.keyCode == 27) this.resetGame();
	}
	,resetGame: function() {
		this.gameLayer.removeChildren();
		this.uiLayer.removeChildren();
		this.startGame();
	}
	,onKeyUp: function(e) {
		if(e.keyCode == 32) this.player.jump();
	}
	,addSound: function(urls,autoplay,loop) {
		if(loop == null) loop = false;
		if(autoplay == null) autoplay = false;
		var snd = null;
		var options = { src : urls, autoplay : autoplay, loop : loop, onend : function(id) {
		}};
		snd = new Howl(options);
		this.sounds.push(snd);
	}
	,__class__: Game
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.set_skipFrame(false);
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.set_fps(60);
};
pixi_plugins_app_Application.__name__ = true;
pixi_plugins_app_Application.prototype = {
	set_fps: function(val) {
		this._frameCount = 0;
		return val >= 1 && val < 60?this.fps = val | 0:this.fps = 60;
	}
	,set_skipFrame: function(val) {
		if(val) {
			console.log("pixi.plugins.app.Application > Deprecated: skipFrame - use fps property and set it to 30 instead");
			this.set_fps(30);
		}
		return this.skipFrame = val;
	}
	,_setDefaultValues: function() {
		this._animationFrameId = null;
		this.pixelRatio = 1;
		this.set_skipFrame(false);
		this.autoResize = true;
		this.transparent = false;
		this.antialias = false;
		this.forceFXAA = false;
		this.roundPixels = false;
		this.clearBeforeRender = true;
		this.preserveDrawingBuffer = false;
		this.backgroundColor = 16777215;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.set_fps(60);
	}
	,start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) rendererType = "auto";
		if(canvasElement == null) {
			var _this = window.document;
			this.canvas = _this.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = "absolute";
		} else this.canvas = canvasElement;
		if(parentDom == null) window.document.body.appendChild(this.canvas); else parentDom.appendChild(this.canvas);
		this.stage = new PIXI.Container();
		var renderingOptions = { };
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		if(rendererType == "auto") this.renderer = PIXI.autoDetectRenderer(this.width,this.height,renderingOptions); else if(rendererType == "canvas") this.renderer = new PIXI.CanvasRenderer(this.width,this.height,renderingOptions); else this.renderer = new PIXI.WebGLRenderer(this.width,this.height,renderingOptions);
		if(this.roundPixels) this.renderer.roundPixels = true;
		if(parentDom == null) window.document.body.appendChild(this.renderer.view); else parentDom.appendChild(this.renderer.view);
		this.resumeRendering();
	}
	,pauseRendering: function() {
		window.onresize = null;
		if(this._animationFrameId != null) {
			window.cancelAnimationFrame(this._animationFrameId);
			this._animationFrameId = null;
		}
	}
	,resumeRendering: function() {
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		if(this._animationFrameId == null) this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function(elapsedTime) {
		this._frameCount++;
		if(this._frameCount == (60 / this.fps | 0)) {
			this._frameCount = 0;
			if(this.onUpdate != null) this.onUpdate(elapsedTime);
			this.renderer.render(this.stage);
		}
		this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,addStats: function() {
		if(window.Perf != null) new Perf().addInfo(["UNKNOWN","WEBGL","CANVAS"][this.renderer.type] + " - " + this.pixelRatio);
	}
	,__class__: pixi_plugins_app_Application
};
var Main = function() {
	this.lastElapsed = 0.0;
	this.dt = 0.0;
	pixi_plugins_app_Application.call(this);
	this.init();
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.__super__ = pixi_plugins_app_Application;
Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
	init: function() {
		this.width = 1024;
		this.height = 576;
		this.backgroundColor = 0;
		this.pixelRatio = 1;
		this.transparent = true;
		this.antialias = false;
		this.onUpdate = $bind(this,this._onUpdate);
		pixi_plugins_app_Application.prototype.start.call(this,"auto");
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.left = "50%";
		this.renderer.view.style.top = "25%";
		this.renderer.view.style.transform = "translate3d( -50%, -25%, 0 )";
		this.game = new Game(this.width,this.height);
		this.stage.addChild(this.game);
	}
	,_onUpdate: function(elapsedTime) {
		this.dt = (elapsedTime - this.lastElapsed) / 1000.0;
		this.lastElapsed = elapsedTime;
		this.game.update(this.dt);
	}
	,__class__: Main
});
var MainMenu = function(texture,onPlay,onHow,onCred) {
	Entity.call(this,texture);
	this.playCBack = onPlay;
	this.howToCBack = onHow;
	this.creditsCBack = onCred;
	this.init();
};
MainMenu.__name__ = true;
MainMenu.__super__ = Entity;
MainMenu.prototype = $extend(Entity.prototype,{
	init: function() {
		var _g = this;
		this.title = new PIXI.Text("Flappy Bet",{ font : "bold 44px Arial", fill : "#333333"});
		this.title.position.set(83.0,25.0);
		this.addChild(this.title);
		this.play = new Button(PIXI.Texture.fromImage("assets/BigBtnUp.png"),PIXI.Texture.fromImage("assets/BigBtnDown.png"),"Play");
		this.play.position.set(102.0,92.0);
		this.play.on("click",function() {
			_g.playCBack();
		});
		this.addChild(this.play);
		this.howTo = new Button(PIXI.Texture.fromImage("assets/BigBtnUp.png"),PIXI.Texture.fromImage("assets/BigBtnDown.png"),"How To");
		this.howTo.position.set(102.0,152.0);
		this.howTo.on("click",function() {
			_g.howToCBack();
		});
		this.addChild(this.howTo);
		this.credits = new Button(PIXI.Texture.fromImage("assets/BigBtnUp.png"),PIXI.Texture.fromImage("assets/BigBtnDown.png"),"Credits");
		this.credits.position.set(102.0,212.0);
		this.credits.on("click",function() {
			_g.creditsCBack();
		});
		this.addChild(this.credits);
	}
	,__class__: MainMenu
});
Math.__name__ = true;
var Obstacle = function(texture) {
	Entity.call(this,texture);
	this.type = Overlap.OBSTACLE;
	this.speed = new PIXI.Point(0.0,0.0);
	this.isActive = false;
	this.visible = false;
};
Obstacle.__name__ = true;
Obstacle.__super__ = Entity;
Obstacle.prototype = $extend(Entity.prototype,{
	update: function(deltaTime) {
		if(!this.isActive) return;
		this.position.x -= this.speed.x * deltaTime;
		if(this.position.x <= -this.width) {
			this.position.set(-this.width,-this.height);
			this.visible = false;
			this.isActive = false;
		}
	}
	,activate: function(newX,newY,speedX,speedY) {
		if(speedY == null) speedY = 0.0;
		if(speedX == null) speedX = 0.0;
		if(newY == null) newY = 0.0;
		if(newX == null) newX = 0.0;
		this.speed.x = speedX;
		this.speed.y = speedY;
		this.position.set(newX,newY);
		this.isActive = true;
		this.visible = true;
	}
	,__class__: Obstacle
});
var Perf = $hx_exports.Perf = function(pos,offset) {
	if(offset == null) offset = 0;
	if(pos == null) pos = "TR";
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) this._memoryObj = Reflect.field(this._perfObj,"memory");
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) this._createMemoryDom();
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame)); else if(window.mozRequestAnimationFrame != null) this.RAF = window.mozRequestAnimationFrame; else if(window.webkitRequestAnimationFrame != null) this.RAF = window.webkitRequestAnimationFrame; else if(window.msRequestAnimationFrame != null) this.RAF = window.msRequestAnimationFrame;
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame)); else if(window.mozCancelAnimationFrame != null) this.CAF = window.mozCancelAnimationFrame; else if(window.webkitCancelAnimationFrame != null) this.CAF = window.webkitCancelAnimationFrame; else if(window.msCancelAnimationFrame != null) this.CAF = window.msCancelAnimationFrame;
	if(this.RAF != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
};
Perf.__name__ = true;
Perf.prototype = {
	_init: function() {
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_now: function() {
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) return this._perfObj.now(); else return new Date().getTime();
	}
	,_tick: function(val) {
		var time;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) time = this._perfObj.now(); else time = new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) this.fps.style.backgroundColor = Perf.FPS_BG_CLR; else if(this.currentFps >= 15) this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR; else this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
	}
	,_createDiv: function(id,top) {
		if(top == null) top = 0;
		var div;
		var _this = window.document;
		div = _this.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) frac = 0;
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) return "0";
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck?48:32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
	,clearInfo: function() {
		if(this.info != null) {
			window.document.body.removeChild(this.info);
			this.info = null;
		}
	}
	,destroy: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
		this._perfObj = null;
		this._memoryObj = null;
		if(this.fps != null) {
			window.document.body.removeChild(this.fps);
			this.fps = null;
		}
		if(this.ms != null) {
			window.document.body.removeChild(this.ms);
			this.ms = null;
		}
		if(this.memory != null) {
			window.document.body.removeChild(this.memory);
			this.memory = null;
		}
		this.clearInfo();
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_cancelRAF: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
	}
	,__class__: Perf
};
var Player = function(speedX,speedY,texture,jumpSnd) {
	this.jumpCharge = 0.0;
	this.justPressed = false;
	this.isDead = false;
	this.gravity = 5.0;
	this.maxJumpCharge = 2.0;
	this.jumpSpeed = 8.0;
	Entity.call(this,texture);
	this.jumpSnd = jumpSnd;
	this.anchor.set(0.5,0.5);
	this.speed = new PIXI.Point(speedX,speedY);
	this.type = Overlap.NONE;
};
Player.__name__ = true;
Player.__super__ = Entity;
Player.prototype = $extend(Entity.prototype,{
	update: function(deltaTime) {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		this.speed.y += this.gravity * deltaTime;
		if(this.isDead) {
			if(this.rotation > -Math.PI / 2) this.rotation -= 0.1;
			this.speed.x *= 0.99;
			return;
		}
		if(this.justPressed) this.jumpCharge += deltaTime;
	}
	,chargeJump: function(initialCharge) {
		if(initialCharge == null) initialCharge = 0.5;
		if(this.isDead) return;
		if(!this.justPressed) {
			this.justPressed = true;
			this.jumpCharge = initialCharge;
		}
	}
	,jump: function() {
		if(this.isDead) return;
		if(this.jumpCharge > this.maxJumpCharge) this.jumpCharge = this.maxJumpCharge;
		this.speed.y -= this.jumpSpeed * this.jumpCharge + this.speed.y / 2;
		this.justPressed = false;
		this.jumpSnd.play();
	}
	,die: function() {
		this.speed.x = -2.0;
		this.speed.y = -2.0;
		this.isDead = true;
	}
	,__class__: Player
});
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var ScrollingBackground = function(texture,width,height) {
	Entity.call(this,null);
	this.speed = new PIXI.Point(0.0,0.0);
	this.type = Overlap.NONE;
	this.tSpr = new PIXI.extras.TilingSprite(texture,width,height);
	this.addChild(this.tSpr);
};
ScrollingBackground.__name__ = true;
ScrollingBackground.__super__ = Entity;
ScrollingBackground.prototype = $extend(Entity.prototype,{
	update: function(deltaTime) {
		this.tSpr.tilePosition.x += this.speed.x * deltaTime;
		this.tSpr.tilePosition.y += this.speed.y * deltaTime;
	}
	,__class__: ScrollingBackground
});
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Trigger = function(texture) {
	Entity.call(this,texture);
	this.type = Overlap.TRIGGER;
	this.speed = new PIXI.Point(0.0,0.0);
	this.isActive = false;
	this.visible = false;
};
Trigger.__name__ = true;
Trigger.__super__ = Entity;
Trigger.prototype = $extend(Entity.prototype,{
	update: function(deltaTime) {
		if(!this.isActive) return;
		this.position.x -= this.speed.x * deltaTime;
		if(this.position.x <= -this.width) {
			this.position.set(-this.width,-this.height);
			this.visible = false;
			this.isActive = false;
		}
	}
	,activate: function(newX,newY,speedX,speedY) {
		if(speedY == null) speedY = 0.0;
		if(speedX == null) speedX = 0.0;
		if(newY == null) newY = 0.0;
		if(newX == null) newX = 0.0;
		this.speed.x = speedX;
		this.speed.y = speedY;
		this.position.set(newX,newY);
		this.isActive = true;
		this.visible = true;
		this.type = Overlap.TRIGGER;
	}
	,__class__: Trigger
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Data.pairPositions = [new PIXI.Point(-35.0,460.0),new PIXI.Point(-150.0,345.0),new PIXI.Point(-265.0,230.0),new PIXI.Point(-380.0,115.0)];
Data.levelTimes = [20.0,15.0,10.0,55.0];
pixi_plugins_app_Application.AUTO = "auto";
pixi_plugins_app_Application.RECOMMENDED = "recommended";
pixi_plugins_app_Application.CANVAS = "canvas";
pixi_plugins_app_Application.WEBGL = "webgl";
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.TOP_LEFT = "TL";
Perf.TOP_RIGHT = "TR";
Perf.BOTTOM_LEFT = "BL";
Perf.BOTTOM_RIGHT = "BR";
Perf.DELAY_TIME = 4000;
js_Boot.__toStr = {}.toString;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=FlappyBet.js.map