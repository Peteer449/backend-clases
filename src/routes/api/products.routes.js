import express from "express";
import { ProductsControllers } from "../../controllers/products.controller.js";

const router = express.Router();
import { ProductsService } from "../../services/productsAndChat.services.js"


// router.get("/",async (req,res)=>{
//   const allProducts = await ProductsService.getProducts()
//   res.render("products",{allProducts})
// })

// router.post("/" , async(req,res)=>{
//   const {title,price,image} = req.body
//   await ProductsService.saveProduct({title,price,image})
//   res.redirect("/api/products")
// })

router.get("/", ProductsControllers.getProducts)

router.post("/" ,ProductsControllers.saveProducts)

export {router as productRouter};