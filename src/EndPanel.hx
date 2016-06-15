package;
import pixi.core.text.Text;
import pixi.core.textures.Texture;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class EndPanel extends Entity
{
	var result:Text;
	var confirm:Button;
	var cBack:Void->Void;
	
	public function new(texture:Texture, cBack:Void->Void) 
	{
		super(texture);
		this.cBack = cBack;
		isActive = false;
		visible = false;
		
		init();
	}
	
	function init() 
	{
		//Result text
		result = new Text('Get Ready Player X!', { font:"bold 28px Arial", fill:"#333333" } );
		result.position.set(15.0, 15.0);
		addChild(result);
		
		//Button
		confirm = new Button(Texture.fromImage('assets/BigBtnUp.png'), Texture.fromImage('assets/BigBtnDown.png'), 'Play');
		confirm.position.set(55.0, 64.0);
		confirm.on('click', onConfirmDown);
		addChild(confirm);
	}
	
	function onConfirmDown() 
	{
		if (cBack != null) cBack();
	}
	
	public function activate(newX:Float = 0.0, newY:Float = 0.0, nextPlayer:Int)
	{
		result.text = 'Get Ready Player $nextPlayer!';
		position.set(newX, newY);
		isActive = true;
		visible = true;
	}
}