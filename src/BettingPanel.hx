package;
import howler.Howl;
import pixi.core.display.Container;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.core.text.Text;
import pixi.core.textures.Texture;

/**
 * Holds all Betting UI and handles gambling logic
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
	
	public var pPlayingMoney:Int;
	public var pGamblingMoney:Int;
	
	var betAmount:Int;
	
	var placeBet:Button;
	var raiseBet:Button;
	var lowerBet:Button;
	
	var currentBet:Bet;
	public var betChoice:Bet;
	
	var betSuccess:Howl;
	var betFail:Howl;
	
	//Which player is currently gambling
	var gambler:Int;
	
	public function new(betSuccess:Howl, betFail:Howl, gambler:Int, pMoney:Int, gMoney:Int) 
	{
		super();
		
		this.betSuccess = betSuccess;
		this.betFail = betFail;
		this.gambler = gambler;
		pPlayingMoney = pMoney;
		pGamblingMoney = gMoney;
		
		init();
	}
	
	function init() 
	{
		betAmount = 0;
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
		
		tpMoney = new Text('$' + Std.string(pPlayingMoney), { font:"bold 24px Arial", fill:"#333333" } );
		tpMoney.position.set(10.0, 41.0);
		addChild(tpMoney);
		
		counter = new Text('0', { font:"bold 28px Arial", fill:"#333333" } );
		counter.position.set(994.0, 10.0);
		addChild(counter);
		
		bottomPlayer = new Text('Player 2', { font:"bold 28px Arial", fill:"#333333" } );
		bottomPlayer.position.set(10.0, 504.0);
		addChild(bottomPlayer);
		
		bpMoney = new Text('$' + Std.string(pGamblingMoney), { font:"bold 24px Arial", fill:"#333333" } );
		bpMoney.position.set(10.0, 535.0);
		addChild(bpMoney);
		
		status = new Text('Waiting for New Challenge', { font:"bold 28px Arial", fill:"#333333" } );
		status.style.align = 'center';
		status.position.set(512.0, 10.0);
		status.anchor.set(0.5, 0.0);
		addChild(status);
		
		betTitle = new Text('Current Bet', { font:"bold 13px Arial", fill:"#333333" } );
		betTitle.position.set(298.0, 512.0);
		addChild(betTitle);
		
		betBody = new Text('No Challenge', { font:"24px Arial", fill:"#333333" } );
		betBody.position.set(185.0, 530.0);
		addChild(betBody);
		
		amountTitle = new Text('Amount', { font:"13px Arial", fill:"#333333" } );
		amountTitle.position.set(650.0, 512.0);
		addChild(amountTitle);
		
		amountBody = new Text('$' + Std.string(betAmount), { font:"bold 24px Arial", fill:"#333333" } );
		amountBody.position.set(635.0, 530.0);
		addChild(amountBody);
		
		if (gambler == 0) {
			topPlayer.text = 'Player 1';
			bottomPlayer.text = 'Player 2';
			tpMoney.text = '$' + Std.string(pGamblingMoney);
			bpMoney.text = '$' + Std.string(pPlayingMoney);
		} else {
			topPlayer.text = 'Player 2';
			bottomPlayer.text = 'Player 1';
			tpMoney.text = '$' + Std.string(pPlayingMoney);
			bpMoney.text = '$' + Std.string(pGamblingMoney);
		}
	}
	
	public function onBetPlaced()
	{
		amountBody.style.fill = '#FF0000';
		amountBody.text = '$' + Std.string(betAmount);
		amountTitle.style.fill = '#FF0000';
		amountTitle.text = 'Amount';
		
		if (betAmount == 0) {
			//If no bet is chosen, auto-place minimum bet
			betAmount = 500;
			amountBody.text = '$' + Std.string(betAmount);
		}
		
		//Disable buttons
		lowerBet.setEnabled(false);
		raiseBet.setEnabled(false);
		placeBet.setEnabled(false);
		
		//TODO: Allow gambler to choose between fail / success
		betChoice = currentBet;
		
		updateStatus('Bet Placed! Awaiting Results...');
	}
	
	public function openBets()
	{
		amountBody.style.fill = '#333333';
		amountBody.text = amountBody.text;
		amountTitle.style.fill = '#333333';
		
		betAmount = 0;
		amountBody.text = '$' + Std.string(betAmount);
		
		//Enable buttons
		lowerBet.setEnabled(true);
		raiseBet.setEnabled(true);
		placeBet.setEnabled(true);
		
		updateStatus('Place your Bet!');
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
	
	public function updatePlayingMoney(value:Int)
	{
		pPlayingMoney += value;
		tpMoney.text = '$' + Std.string(pPlayingMoney);
	}
	
	public function updateGamblingMoney(value:Int)
	{
		pGamblingMoney += value;
		bpMoney.text = '$' + Std.string(pGamblingMoney);
	}
	
	public function updateCounter(value:Int)
	{
		counter.text = Std.string(value);
	}
	
	public function updateStatus(text:String)
	{
		status.text = text;
	}
	
	public function setBetBodyQty(qty:Int)
	{
		if (Math.random() > 0.5) {
			betBody.text = 'Will fail in one of the next $qty!';
			currentBet = Bet.FAIL;
		} else {
			betBody.text = 'Will pass through the next $qty!';
			currentBet = Bet.SUCCESS;
		}
	}
	
	public function reduceBetBodyQty()
	{
		var qty:Int = Std.parseInt(betBody.text.substr(betBody.text.length - 2, 1));
		qty = qty > 0 ? qty - 1 : 0;
		
		if (currentBet == Bet.SUCCESS)
			betBody.text = 'Will pass through the next $qty!';
		else if (currentBet == Bet.FAIL)
			betBody.text = 'Will fail in one of the next $qty!';
		
		if (qty == 0) {
			setBetResult(Bet.SUCCESS);
			//updateStatus('Waiting for New Challenge');
			betBody.text = 'No Challenge';
		}
	}
	
	//If challenge is done, reward / punish the gambler
	public function setBetResult(res:Bet)
	{
		//If success - Award bet money x 2 to gambler
		if (res == betChoice) {
			updateGamblingMoney(betAmount * 2);
			updatePlayingMoney(-betAmount);
			betSuccess.play();
			updateStatus('Player ${gambler + 1} Wins!');
		} else {
			//If fail - Award bet money to player
			updatePlayingMoney(betAmount);
			updateGamblingMoney( -betAmount);
			betFail.play();
			var winner = gambler == 0 ? 2 : 1;
			updateStatus('Player $winner Wins!');
		}
	}
	
	public function togglePlayers()
	{
		gambler = gambler > 0 ? 0 : 1;
		if (gambler == 0) {
			//Change labels
			topPlayer.text = 'Player 2';
			bottomPlayer.text = 'Player 1';
		} else {
			topPlayer.text = 'Player 1';
			bottomPlayer.text = 'Player 2';
		}
		
		//Change money
		var temp = pPlayingMoney;
		pPlayingMoney = pGamblingMoney;
		pGamblingMoney = temp;
		tpMoney.text = '$' + Std.string(pPlayingMoney);
		bpMoney.text = '$' + Std.string(pGamblingMoney);
	}
	
}

enum Bet {
	NO_BET;
	SUCCESS;
	FAIL;
}