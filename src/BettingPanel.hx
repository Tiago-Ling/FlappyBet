package;
import pixi.core.display.Container;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.text.Text;
import pixi.core.textures.Texture;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class BettingPanel extends Container
{
	var topPlayer:Text;
	var status:Text;
	var tpMoney:Text;
	var bpMoney:Text;
	var bottomPlayer:Text;
	var betTitle:Text;
	var betBody:Text;
	var amountBody:Text;
	var amountTitle:Text;
	var counter:Text;
	
	var pAMoney:Int;
	var pBMoney:Int;
	var betAmount:Int;
	
	var placeBet:Button;
	var raiseBet:Button;
	var lowerBet:Button;
	
	public function new() 
	{
		super();
		
		init();
	}
	
	function init() 
	{
		pAMoney = 7500;
		pBMoney = 7500;
		betAmount = 1000;
		//UI
		var betPanel:Sprite = new Sprite(Texture.fromImage('assets/betPanel.png'));
		betPanel.position.set(0.0, 496.0);
		addChild(betPanel);
		
		lowerBet = new Button(Texture.fromImage('assets/SmallBtnUp.png'), Texture.fromImage('assets/SmallBtnDown.png'), '-', new Point(0.0, -2.0));
		lowerBet.position.set(549.0, 512.0);
		lowerBet.on('click', onBetLowered);
		addChild(lowerBet);
		
		raiseBet = new Button(Texture.fromImage('assets/SmallBtnUp.png'), Texture.fromImage('assets/SmallBtnDown.png'), '+');
		raiseBet.position.set(744.0, 512.0);
		raiseBet.on('click', onBetRaised);
		addChild(raiseBet);
		
		placeBet = new Button(Texture.fromImage('assets/BigBtnUp.png'), Texture.fromImage('assets/BigBtnDown.png'), 'Place Bet');
		placeBet.position.set(819.0, 512.0);
		placeBet.on('click', onBetPlaced);
		addChild(placeBet);
		
		//Texts
		topPlayer = new Text('Player 1', { font:"bold 28px Arial", fill:"#333333" } );
		topPlayer.position.set(10.0, 10.0);
		addChild(topPlayer);
		
		tpMoney = new Text('$' + Std.string(pAMoney), { font:"bold 24px Arial", fill:"#333333" } );
		tpMoney.position.set(10.0, 41.0);
		addChild(tpMoney);
		
		counter = new Text('0', { font:"bold 28px Arial", fill:"#333333" } );
		counter.position.set(994.0, 10.0);
		addChild(counter);
		
		bottomPlayer = new Text('Player 2', { font:"bold 28px Arial", fill:"#333333" } );
		bottomPlayer.position.set(10.0, 504.0);
		addChild(bottomPlayer);
		
		bpMoney = new Text('$' + Std.string(pBMoney), { font:"bold 24px Arial", fill:"#333333" } );
		bpMoney.position.set(10.0, 535.0);
		addChild(bpMoney);
		
		status = new Text('Betting Open!', { font:"bold 28px Arial", fill:"#333333" } );
		status.position.set(412.0, 10.0);
		addChild(status);
		
		betTitle = new Text('Current Bet', { font:"bold 13px Arial", fill:"#333333" } );
		betTitle.position.set(298.0, 512.0);
		addChild(betTitle);
		
		betBody = new Text('Will fail in one of the next X!', { font:"24px Arial", fill:"#333333" } );
		betBody.position.set(185.0, 530.0);
		addChild(betBody);
		
		amountTitle = new Text('Amount', { font:"13px Arial", fill:"#333333" } );
		amountTitle.position.set(650.0, 512.0);
		addChild(amountTitle);
		
		amountBody = new Text('$' + Std.string(betAmount), { font:"bold 24px Arial", fill:"#333333" } );
		amountBody.position.set(635.0, 530.0);
		addChild(amountBody);
	}
	
	function onBetPlaced()
	{
		updatePBMoney( -betAmount);
		
		//Disable buttons
		lowerBet.setEnabled(false);
		raiseBet.setEnabled(false);
		placeBet.setEnabled(false);
	}
	
	function onBetLowered()
	{
		betAmount -= 500;
		amountBody.text = '$' + Std.string(betAmount);
	}
	
	function onBetRaised()
	{
		betAmount += 500;
		amountBody.text = '$' + Std.string(betAmount);
	}
	
	public function updatePAMoney(value:Int)
	{
		tpMoney.text = '$' + Std.string(pAMoney + value);
	}
	
	public function updatePBMoney(value:Int)
	{
		bpMoney.text = '$' + Std.string(pBMoney + value);
	}
	
	public function updateCounter(value:Int)
	{
		counter.text = Std.string(value);
	}
	
	public function updateStatus(text:String, qty:Int)
	{
		status.text = text;
		betBody.text = 'Will fail in one of the next $qty!';
	}
	
	public function updateBetBody()
	{
		
	}
	
}