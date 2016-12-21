class CommanderViewController extends eui.Component{
	public constructor() {
		super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/game_skins/herosUISkin.exml";
	}

	private uiCompHandler(): void{
		console.log("Commander Page");
	}
}