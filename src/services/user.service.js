import authRequest from "./generic.service";

export default class UserService {
  static async updateUserData(email, userData) {
    return authRequest.put('/users/update', { email, userData });
  }
}