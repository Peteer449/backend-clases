// import { UserManager } from "../model/index.js";
import { getApiDao } from "../model/index.js";
import { convertUserToDto } from "../model/dtos/user.dto.js";
const {UserManager} = await getApiDao("mongo")

class UserService{
  static async getUsers(){
    const users = await UserManager.getAll()
    const usersDto = convertUserToDto(users)
    return usersDto
  }
}

export {UserService}