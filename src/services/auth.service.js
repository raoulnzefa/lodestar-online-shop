import authRequest from "./generic.service";

export default class AuthService {
  static async login(email, password) {
    return authRequest.post('/authentication/login', { email, password })
  }

  static async registration(email, password) {
    return authRequest.post('/authentication/registration', { email, password })
  }

  static async logout() {
    return authRequest.post('/authentication/logout');
  }
}