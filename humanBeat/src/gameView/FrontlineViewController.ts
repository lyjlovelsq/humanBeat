class FrontlineViewController extends eui.Component{
    private userModel: UserModel;
    constructor() {
        super();
        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/game_skins/qianxianUISkin.exml";
        this.userModel = UserModel.getSharedInstance();
    }
    private base:eui.Image;
    private uiCompHandler():void {
        console.log("frontline view");
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    }

    private touchHandler( evt:egret.TouchEvent ){
        console.log(evt.stageX, evt.stageY);
        if(evt.stageY > 640){
            this.addMineral(evt.stageX, evt.stageY);
        }
    }

    private addMineral(x:number, y:number): void{
        console.log("add" + GameConstants.clickAddNums);
        var msg = "晶矿+" + GameConstants.clickAddNums.toString();
        console.log(msg);
        var addMineralText:egret.TextField = GameUtils.getTextField(msg, 40, x, y, 200, 40);
        this.base.scaleX = 1;
        this.base.scaleY = 1;
        egret.Tween.get(this.base)
            .to({scaleX:1.1, scaleY:1.1})
            .wait(100)
            .to({scaleX:1, scaleY:1});

        egret.Tween.get(addMineralText)
            .to({y:addMineralText.y - 100}, 1000)
            .call( ()=>{
                this.removeChild(addMineralText);
            });
        this.addChild(addMineralText);
        this.userModel.mineralNum += GameConstants.clickAddNums;
        this.refreshMineralText();
    }

    private refreshMineralText():void{
        this.dispatchEventWith(GameEvents.EVT_ADD_MINERAL);
    }

}