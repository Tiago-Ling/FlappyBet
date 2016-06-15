package;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.core.textures.Texture;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Tiago Ling Alexandre
 */
class Button extends Entity
{
	var upTex:Texture;
	var downTex:Texture;
	var label:Text;
	var labelOffset:Point;
	
	public function new(upTex:Texture, downTex:Texture, txt:String, offset:Point = null) 
	{
		super(upTex);
		this.upTex = upTex;
		this.downTex = downTex;
		
		this.buttonMode = true;
		this.interactive = true;
		
		if (offset == null) offset = new Point(0.0, 0.0);
		label = new Text(txt, { font:"bold 28px Arial", fill:"#333333" } );
		label.position.set(this.width / 2 - label.width / 2 + offset.x, this.height / 2 - label.height / 2 + offset.y);
		addChild(label);
		
		on("mousedown", onDown);
		on("mouseup", onUp);
		on("mouseupoutside", onUp);
	}
	
	override public function update(deltaTime:Float)
	{
		
	}
	
	public function setText(txt:String)
	{
		label.text = txt;
	}
	
	public function setEnabled(value:Bool)
	{
		tint = value ? 0xFFFFFF : 0x333333;
		interactive = value;
		buttonMode = value;
	}
	
	function onDown(e:EventTarget) 
	{
		texture = downTex;
		position.y += 4.0;
	}
	
	function onUp(e:EventTarget)
	{
		texture = upTex;
		position.y -= 4.0;
	}
}