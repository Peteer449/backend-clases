import { UserManager } from "../dbOperations/index.js";

class UserService{
  static async getUsers(){
    return await UserManager.getAll()
  }
}

export {UserService}