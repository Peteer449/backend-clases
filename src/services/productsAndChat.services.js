import { FirebaseManagerProducts } from "../dbOperations/index.js";
import { FirebaseManagerChat } from "../dbOperations/index.js";

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