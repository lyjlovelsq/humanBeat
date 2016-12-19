/**
 * Created by egret on 2016/1/20.
 */

class BaseViewController extends eui.Component{

    constructor( ) {
        super();

        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/game_skins/homeUISkin.exml";
    }

    private uiCompHandler():void {
        console.log( "HomeUI uiCompHandler");


        this.mbtnYaosai.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.mbtnQianxian.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.mbtnHeros.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
       

        
        this.btns = [this.mbtnYaosai,this.mbtnQianxian,this.mbtnHeros];
        
        /// 首次加载完成首先显示home
        this.goHome(); 
    }
    private  btns:eui.ToggleButton[];
    
    private resetFocus():void{
        console.log( " resetFocus " );
        if( this._uiFocused ){
            if( this._uiFocused.parent ){
                this._uiFocused.parent.removeChild( this._uiFocused );
            }
            this._uiFocused = null;
        }
        if( this._mbtnFocused !=null ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    }
    
    private goHome():void{
        console.log( " ---------- HOME ---------- " );
        this._pageFocusedPrev = this._pageFocused = "home";
        console.log( "this.mbtnQianxian:",this.mbtnQianxian.selected );
    }
    
    private mbtnHandler( evt:egret.TouchEvent ):void{


        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._mbtnFocused ) {
            console.log( evt.currentTarget.name, "已经选中不应当再处理!" );
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = false;
            
        }

        /// 移除上一焦点对应的按钮
        //console.log( "remove _mbtnFocused:", this._mbtnFocused );
        if( this._mbtnFocused ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if( this._uiFocused && this._uiFocused.parent ){
            this._uiFocused.parent.removeChild( this._uiFocused );
        }
        
        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log( "选中", this._mbtnFocused.name  );
        this._mbtnFocused.enabled = false;
        
        /// 焦点UI重置
        this._uiFocused = null;

        this._pageFocusedPrev = this._pageFocused;
        switch ( this._mbtnFocused ){
            case this.mbtnYaosai:
                this._pageFocused ="";
                break;
            case this.mbtnQianxian:
                this._pageFocused ="qianxian";
                break;
            case this.mbtnHeros:
                this._pageFocused ="";
                break;

        }
        this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false, this._pageFocused );
    }
    private _pageFocusedPrev:string;

    createChildren():void {
        super.createChildren();
    }

    private mbtnQianxian:eui.ToggleButton;
    private mbtnHeros:eui.ToggleButton;
    private mbtnYaosai:eui.ToggleButton;
    private _mbtnFocused:eui.ToggleButton;
    
    private _qianxianUI:qianxianUI;
    // private _herosUI:HerosUI;
    // private _goodsUI:GoodsUI;

    private _uiFocused:eui.Component;
    
    private homebg:eui.Image;
    
    private _pageFocused:string;

    public pageReadyHandler( pageName:String ):void {
        
        /// 页面加载完成，所有非焦点按钮解锁
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = ! this.btns[i].selected;
          
        }
        
        switch ( pageName ){

            case "qianxian":
                if( !this._qianxianUI ){


                    this._qianxianUI = new qianxianUI();
                    this._qianxianUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                    
                        this.goHome();
                    }, this );

                   
                }
                // this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._qianxianUI;

                
                break;
         
        }
        /// 总是把页面放在背景的上一层！

        
        this._uiFocused.y=60
        this.addChildAt( this._uiFocused, this.getChildIndex( this.homebg ) + 1 );
        console.log( "this.mbtnQianxian:",this.mbtnQianxian.selected );
    }
}