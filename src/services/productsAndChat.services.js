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

const rootProducts = {
  getProducts:async()=>{
      return await FirebaseManagerProducts.getAllProducts();
  },

  getProductById:async({id})=>{
    return await FirebaseManagerProducts.getById(id)
  },

  addProduct:async({product})=>{
    return await FirebaseManagerProducts.save(product)
  },
  deleteProduct:async({id})=>{
    return await FirebaseManagerProducts.deleteById(id)
  },
  updateProductById:async({id})=>{
    return await FirebaseManagerProducts.updateById(id)
  }
};

export {ProductsService,ChatService,rootProducts}