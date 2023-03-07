// import { FirebaseManagerProducts } from "../model/index.js";
// import { FirebaseManagerChat } from "../model/index.js";
import { getApiDao } from "../model/index.js";
const {FirebaseManagerChat,FirebaseManagerProducts} = await getApiDao("firebase")

class ProductsService{
  static async getProducts(){
    return await FirebaseManagerProducts.getAllProducts()
  }
  static async saveProduct(product){
    return await FirebaseManagerProducts.save(product)
  }
}

class ChatService{
  static async getChat(){
    return await FirebaseManagerChat.getAll()
  }
}

export {ProductsService,ChatService}