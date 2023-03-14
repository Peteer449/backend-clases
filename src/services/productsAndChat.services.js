import { getApiDao } from "../model/index.js";
const {FirebaseManagerChat,FirebaseManagerProducts} = await getApiDao("firebase")

class ProductsService{
  static async getProducts(){
    return await FirebaseManagerProducts.getAllProducts()
  }
  static async saveProduct(product){
    return await FirebaseManagerProducts.save(product)
  }
  static async deleteProduct(id){
    return await FirebaseManagerProducts.deleteById(id)
  }
  static async updateProduct(id){
    return await FirebaseManagerProducts.updateById(id)
  }
}

class ChatService{
  static async getChat(){
    return await FirebaseManagerChat.getAll()
  }
}

export {ProductsService,ChatService}