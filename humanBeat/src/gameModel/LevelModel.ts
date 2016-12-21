class LevelModel {
	public monsterNum:number;
	public constructor(data?) {
		this.initWithData();
	}
	public initWithData(data?){
		if(data){

		}else {
			this.monsterNum = 30;
		}
	}
}