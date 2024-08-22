import http from "../http";
import type { LoginApiTypes } from "../interface/login";

const baseURL = import.meta.env.VITE_BASE_LOGIN_URL;

class Login {
	login(data: LoginApiTypes.ReqLoginForm) {
		return http.post(
			"/login/password",
			{
				...data
			},
			{
				baseURL
			}
		);
	}
}

export default new Login();
