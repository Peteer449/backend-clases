import { ProductsService } from "../services/productsAndChat.services.js"

class ProductsControllers{
  static async getProducts(req,res){
    try {
      const allProducts = await ProductsService.getProducts()
      res.status(200).json({
        status:"SUCCESS",
        data: allProducts
    });
      // res.render("products",{allProducts})
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
      const response = await ProductsService.saveProduct({title,price,image})
      res.status(200).json({
        status:"SUCCESS",
        data: response
    });
      // res.redirect("/api/products")
    } catch (error) {
      res.status(400).json({
        status:"ERROR",
        message:"Hubo un error " + error
      })
    }
  }

  static async deleteProduct(req,res){
    try {
      const product = await ProductsService.deleteProduct(req.params.id)
      //const allProducts = await ProductsService.getProducts()
      res.status(200).json({
        status:"SUCCESS",
        data: product
    });
      // res.render("products",{allProducts})
    } catch (error) {
      res.status(400).json({
        status:"ERROR",
        message:"Hubo un error " + error
      })
    }
  }

  static async updateProduct(req,res){
    try {
      const product = await ProductsService.updateProduct(req.params.id)
      res.status(200).json({
        status:"SUCCESS",
        data: product
    });
      // res.render("products",{allProducts})
    } catch (error) {
      res.status(400).json({
        status:"ERROR",
        message:"Hubo un error " + error
      })
    }
  }
}

export {ProductsControllers}