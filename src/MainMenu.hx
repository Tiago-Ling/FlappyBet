package;
import pixi.core.text.Text;
import pixi.core.textures.Texture;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class MainMenu extends Entity
{
	var title:Text;
	
	var play:Button;
	var playCBack:Void->Void;
	
	var howTo:Button;
	var howToCBack:Void->Void;
	
	var credits:Button;
	var creditsCBack:Void->Void;
	
	public function new(texture:Texture, onPlay:Void->Void, onHow:Void->Void, onCred:Void->Void) 
	{
		super(texture);
		
		playCBack = onPlay;
		howToCBack = onHow;
		creditsCBack = onCred;
		
		init();
	}
	
	function init() 
	{
		//Result text
		title = new Text('Flappy Bet', { font:"bold 44px Arial", fill:"#333333" } );
		title.position.set(83.0, 25.0);
		addChild(title);
		
		//Button
		play = new Button(Texture.fromImage('assets/BigBtnUp.png'), Texture.fromImage('assets/BigBtnDown.png'), 'Play');
		play.position.set(102.0, 92.0);
		play.on('click', function() { playCBack(); } );
		addChild(play);
		
		//Button
		howTo = new Button(Texture.fromImage('assets/BigBtnUp.png'), Texture.fromImage('assets/BigBtnDown.png'), 'How To');
		howTo.position.set(102.0, 152.0);
		howTo.on('click', function() { howToCBack(); } );
		addChild(howTo);
		
		//Button
		credits = new Button(Texture.fromImage('assets/BigBtnUp.png'), Texture.fromImage('assets/BigBtnDown.png'), 'Credits');
		credits.position.set(102.0, 212.0);
		credits.on('click', function() { creditsCBack(); } );
		addChild(credits);
	}
	
}