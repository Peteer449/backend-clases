import { ProductsService } from "../services/productsAndChat.services.js"

class ProductsControllers{
  static async getProducts(req,res){
    try {
      const allProducts = await ProductsService.getProducts()
      res.render("products",{allProducts})
    } catch (error) {
      res.status(400).json({
        status:"ERROR",
        message:"Hubo un error " + error
      })
    }
  }
  static async saveProducts(req,res){
    const {title,price,image} = req.body
    try {
      await ProductsService.saveProduct({title,price,image})
      res.redirect("/api/products")
    } catch (error) {
      res.status(400).json({
        status:"ERROR",
        message:"Hubo un error " + error
      })
    }
  }
}

export {ProductsControllers}