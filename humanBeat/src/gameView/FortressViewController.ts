class FortressViewController extends eui.Component{
	public constructor() {
		super();
		this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/game_skins/fortressUISkin.exml";
	}

	private uiCompHandler(){
		console.log("fortress view");
	}
}