(function (console, $hx_exports) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BettingPanel = function() {
	PIXI.Container.call(this);
	this.init();
};
BettingPanel.__name__ = true;
BettingPanel.__super__ = PIXI.Container;
BettingPanel.prototype = $extend(PIXI.Container.prototype,{
	init: function() {
		this.pAMoney = 7500;
		this.pBMoney = 7500;
		this.betAmount = 1000;
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
		this.tpMoney = new PIXI.Text("$" + Std.string(this.pAMoney),{ font : "bold 24px Arial", fill : "#333333"});
		this.tpMoney.position.set(10.0,41.0);
		this.addChild(this.tpMoney);
		this.counter = new PIXI.Text("0",{ font : "bold 28px Arial", fill : "#333333"});
		this.counter.position.set(994.0,10.0);
		this.addChild(this.counter);
		this.bottomPlayer = new PIXI.Text("Player 2",{ font : "bold 28px Arial", fill : "#333333"});
		this.bottomPlayer.position.set(10.0,504.0);
		this.addChild(this.bottomPlayer);
		this.bpMoney = new PIXI.Text("$" + Std.string(this.pBMoney),{ font : "bold 24px Arial", fill : "#333333"});
		this.bpMoney.position.set(10.0,535.0);
		this.addChild(this.bpMoney);
		this.status = new PIXI.Text("Betting Open!",{ font : "bold 28px Arial", fill : "#333333"});
		this.status.position.set(412.0,10.0);
		this.addChild(this.status);
		this.betTitle = new PIXI.Text("Current Bet",{ font : "bold 13px Arial", fill : "#333333"});
		this.betTitle.position.set(298.0,512.0);
		this.addChild(this.betTitle);
		this.betBody = new PIXI.Text("Will fail in one of the next X!",{ font : "24px Arial", fill : "#333333"});
		this.betBody.position.set(185.0,530.0);
		this.addChild(this.betBody);
		this.amountTitle = new PIXI.Text("Amount",{ font : "13px Arial", fill : "#333333"});
		this.amountTitle.position.set(650.0,512.0);
		this.addChild(this.amountTitle);
		this.amountBody = new PIXI.Text("$" + Std.string(this.betAmount),{ font : "bold 24px Arial", fill : "#333333"});
		this.amountBody.position.set(635.0,530.0);
		this.addChild(this.amountBody);
	}
	,onBetPlaced: function() {
		this.updatePBMoney(-this.betAmount);
		this.lowerBet.setEnabled(false);
		this.raiseBet.setEnabled(false);
		this.placeBet.setEnabled(false);
	}
	,onBetLowered: function() {
		this.betAmount -= 500;
		this.amountBody.text = "$" + Std.string(this.betAmount);
	}
	,onBetRaised: function() {
		this.betAmount += 500;
		this.amountBody.text = "$" + Std.string(this.betAmount);
	}
	,updatePAMoney: function(value) {
		this.tpMoney.text = "$" + Std.string(this.pAMoney + value);
	}
	,updatePBMoney: function(value) {
		this.bpMoney.text = "$" + Std.string(this.pBMoney + value);
	}
	,updateCounter: function(value) {
		if(value == null) this.counter.text = "null"; else this.counter.text = "" + value;
	}
	,updateStatus: function(text,qty) {
		this.status.text = text;
		this.betBody.text = "Will fail in one of the next " + qty + "!";
	}
	,updateBetBody: function() {
	}
	,__class__: BettingPanel
});
var Entity = function(texture) {
	PIXI.Sprite.call(this,texture);
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
		if(value) this.tint = 16777215; else this.tint = 3355443;
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
		var _g = this;
		this.interactive = true;
		this.entities = [];
		this.gameLayer = new PIXI.Container();
		this.uiLayer = new PIXI.Container();
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
		loader.load((function($this) {
			var $r;
			var onComplete = function() {
				var bg = new ScrollingBackground(PIXI.Texture.fromImage("assets/blue_desert.png"),1024,1024);
				bg.position.set(0,-330);
				bg.speed.set(-50.0,0.0);
				_g.entities.push(bg);
				_g.ground = new ScrollingBackground(PIXI.Texture.fromImage("assets/ground.png"),1050,70);
				_g.ground.position.set(0,460);
				_g.ground.speed.set(-100.0,0.0);
				_g.entities.push(_g.ground);
				_g.player = new Player(0,0,PIXI.Texture.fromImage("assets/bunny.png"));
				_g.player.position.set(256,288);
				_g.entities.push(_g.player);
				_g.betPanel = new BettingPanel();
				_g.gameLayer.addChild(bg);
				_g.gameLayer.addChild(_g.player);
				var poolSize = 10;
				_g.obstaclePool = [];
				_g.triggerPool = [];
				var _g1 = 0;
				while(_g1 < poolSize) {
					var i = _g1++;
					var obA = new Obstacle(PIXI.Texture.fromImage("assets/block.png"));
					_g.obstaclePool.push(obA);
					_g.entities.push(obA);
					_g.gameLayer.addChild(obA);
					var obB = new Obstacle(PIXI.Texture.fromImage("assets/block.png"));
					_g.obstaclePool.push(obB);
					_g.entities.push(obB);
					_g.gameLayer.addChild(obB);
					var tr = new Trigger(PIXI.Texture.fromImage("assets/trigger.png"));
					_g.triggerPool.push(tr);
					_g.entities.push(tr);
					_g.gameLayer.addChild(tr);
				}
				_g.gameLayer.addChild(_g.ground);
				_g.uiLayer.addChild(_g.betPanel);
				_g.addChild(_g.gameLayer);
				_g.addChild(_g.uiLayer);
				window.document.addEventListener("keydown",$bind(_g,_g.onKeyDown));
				window.document.addEventListener("keyup",$bind(_g,_g.onKeyUp));
				_g.canRun = true;
			};
			$r = onComplete;
			return $r;
		}(this)));
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
		if(this.tPassed == this.target) {
			this.chillTime -= deltaTime;
			if(this.chillTime <= 0.0) {
				var qty = this.getRandomSequence();
				this.target = this.tPassed + qty;
				this.chillTime = 3.0;
				this.betPanel.updateStatus("Betting Opened!",qty);
			}
		}
	}
	,getRandomSequence: function() {
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
			trigger.activate(obX + 17.5,trigY);
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
			this.player.speed.y *= -1.0;
			this.player.speed.y *= 0.25;
		}
		if(this.player.isDead) return;
		var _g1 = 0;
		var _g = this.entities.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entity = this.entities[i];
			if(!js_Boot.__instanceof(entity,PIXI.Sprite)) continue;
			var spr;
			spr = js_Boot.__cast(entity , PIXI.Sprite);
			if(this.player.position.x + pHalfW > spr.position.x && this.player.position.x < spr.position.x + spr.width) {
				if(this.player.position.y + pHalfH > spr.position.y && this.player.position.y < spr.position.y + spr.height) {
					var _g2 = entity.type;
					switch(_g2[1]) {
					case 2:
						this.player.die();
						this.stop();
						break;
					case 1:
						break;
					case 3:
						this.tPassed += 1;
						this.betPanel.updateCounter(this.tPassed);
						spr.visible = false;
						entity.type = Overlap.NONE;
						if(this.betStatus == 0) {
							this.betStatus = 1;
							this.betPanel.updateStatus("Betting Closed!",0);
						}
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
			if(!tr.isActive) return tr;
		}
		var trigger = new Trigger(PIXI.Texture.fromImage("assets/trigger.png"));
		this.triggerPool.push(trigger);
		return trigger;
	}
	,onKeyDown: function(e) {
		if(e.keyCode == 32) this.player.chargeJump();
	}
	,onKeyUp: function(e) {
		if(e.keyCode == 32) this.player.jump();
	}
	,__class__: Game
});
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
var Player = function(speedX,speedY,texture) {
	this.jumpCharge = 0.0;
	this.justPressed = false;
	this.isDead = false;
	this.gravity = 5.0;
	this.maxJumpCharge = 2.0;
	this.jumpSpeed = 8.0;
	Entity.call(this,texture);
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
		if (e instanceof js__$Boot_HaxeError) e = e.val;
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
	}
	,__class__: Trigger
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
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
			if (e instanceof js__$Boot_HaxeError) e = e.val;
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
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
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
Data.pairPositions = [new PIXI.Point(-35.0,4600.0),new PIXI.Point(-150.0,345.0),new PIXI.Point(-265.0,230.0),new PIXI.Point(-3800.0,115.0)];
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