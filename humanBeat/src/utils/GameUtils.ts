// TypeScript file

class GameUtils {
    public static createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static createBitmapBySheetAndName(sheet:string, name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let path = sheet + "_json." +name;
        let texture:egret.Texture = RES.getRes(path);
        result.texture = texture;
        return result;
    }

    public static createDragonBones(skeleton:string, textureJson:string, texturePic:string){
        var skeletonData = RES.getRes(skeleton);
        var textureData = RES.getRes(textureJson);
        var texture = RES.getRes(texturePic);
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        var armature:dragonBones.Armature = factory.buildArmature("Armature");

        return armature;
    }

    public static getTextField(msg:string, size: number, x: number,y: number,w?: number,h?: number,mutil: boolean = false): egret.TextField {
        var txt: egret.TextField = new egret.TextField();
        txt.x = x - w / 2;
        txt.y = y - h;
		txt.width = w;
        txt.height = h;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.fontFamily = "微软雅黑";
        txt.textColor = 0x00b8c9;
        txt.multiline = mutil;
        txt.size = size;
        console.log(msg);
		txt.text = msg;
        return txt;
    }

    public static getlength(str:string){
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };

    public static normalDistributionIntegral(x: number): number{
        let k: number = 1000;
        let dx: number  = 1 / k;
        let xi: number = 0;
        //积分
        let integral: number = 0;
        while(xi < x){
            integral += dx * GameUtils.normalDistribution(xi);
            xi += dx;
        }
        return integral;
    }

    //正太分布
    public static normalDistribution(x: number): number{
        //正态分布参数1
        let u:number = 0; 
        //正太分布参数2
        let v:number = 1;
        let xishu:number = 1 / (Math.sqrt(2 * Math.PI) * v);
        let y: number = xishu * Math.exp(-Math.pow(x - u, 2) / (2 * v * v));
        return  y;
    }

    public static getMovieClipbyName(aa:string):any{
                                        
        var data = RES.getRes(aa+"_json");        
        //获取纹理图        
        var texture = RES.getRes(aa+"_png");        
        //获取MovieClipData工厂类        
        var mcFactory = new egret.MovieClipDataFactory(data, texture);        
        //根据动画名创建    
        // var rad: number = Math.round(Math.random() * 1) + 1;
        var mc:egret.MovieClip=new egret.MovieClip(mcFactory.generateMovieClipData(aa));        
        //添加到显示列表        
        // this.addChild(mc);  
        // mc.x = 100;
        //  mc.y = 150;
                                     
        //mc.frameRate =10;
        // mc.play();
        return mc;
                                        
    }  


    //取任意两数之间的随机数
    public static crateRandom(lowValue:number,highValue:number){
        var choice=highValue-lowValue+1;
        return Math.floor(Math.random()*choice+lowValue);
    }

    public static removeElementFromArray(array: egret.Bitmap[], index: number ):void{
        for (let i: number = index; i < array.length; i++){
            array[i] = array[i+1];
        }
        array.length --;
    }

    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject , lor: boolean):boolean
        {   
            var isHitted: boolean;
            var temp1: number;
            var temp2: number;
            var temp: number;
            let x11: number;
            let x12: number;
            let y11: number;
            let y12: number;
            //console.log("rotation"+ obj1.rotation);
            let angle: number = Math.atan(obj1.width / obj1.height) * 180 / Math.PI;
            let duijiaoxian: number = Math.sqrt(Math.pow(obj1.width, 2) + Math.pow(obj1.height, 2));
            //console.log("对角线:"+duijiaoxian);
            temp1 =  Math.abs(duijiaoxian * Math.sin(angle + obj1.rotation)) / 2;
            temp2 = Math.abs(duijiaoxian * Math.sin(angle - obj1.rotation)) / 2;
            temp = (temp1 > temp2) ? temp1 : temp2;
            //console.log("tempfirst" + temp);
            let x01: number = obj1.x - temp;
            let x02: number = obj1.x + temp;

            temp1 = Math.abs(duijiaoxian * Math.cos(angle + obj1.rotation)) / 2;
            temp2 = Math.abs(duijiaoxian * Math.cos(angle - obj1.rotation)) / 2;
            temp = (temp1 > temp2) ? temp1 : temp2;
            //console.log("tempsecond" + temp);
            let y01: number = obj1.y - temp;
            let y02: number = obj1.y + temp;
            //console.log("x01:" + x01 + " x02:" + x02 + " y01:"+ y01 + " y02:"+ y02);

            if(lor){
                x11 = obj2.x;
                x12 = obj2.x + obj2.width;
                y11 = obj2.y + obj2.width * 0.2;
                y12 = obj2.y - obj2.height - obj2.width * 0.2;
                //console.log("left x11:"+x11+" x12:"+x12+" y11:"+y11+" y12:"+y12);
            } else {
                x11 = obj2.x - obj2.width;
                x12 = obj2.x;
                y11 = obj2.y + obj2.width * 0.2;
                y12 = obj2.y - obj2.height - obj2.width * 0.2;
                //console.log("right x11:"+x11+"x12:"+x12+" y11:"+y11+" y12:"+y12);
            }
            //两矩形重心在x轴投影的距离
            
            let zx: number = Math.abs(x01 + x02 - x11 -x12);
            
            let xx: number = Math.abs(x01 - x02) + Math.abs(x11 - x12);

            let zy: number = Math.abs(y01 + y02 - y11 - y12);

            let yy: number = Math.abs(y01- y02) + Math.abs(y11 - y12);
            

            if (zy <=yy){
                isHitted = true;
            } else {
                isHitted = false;
            }

            return isHitted;
        }
}