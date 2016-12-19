class qianxianUI extends eui.Component{

    constructor( ) {
        super();

        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/game_skins/qianxianUISkin.exml";
    }

    private uiCompHandler():void {
        
    }
  
}