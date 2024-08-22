// * 登录模块
export namespace LoginApiTypes {
	export interface ReqLoginForm {
		mobile: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
}
