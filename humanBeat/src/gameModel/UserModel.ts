class UserModel {
	private static _instance = null;
	public static getSharedInstance(): UserModel{
		if(UserModel._instance == null){
			UserModel._instance = new UserModel();
		}
		return UserModel._instance;
	}

	public mineralNum: number = 1;
	public constructor(){
		this.mineralNum = 1;
	}
}