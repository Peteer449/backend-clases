import express from "express";
import { ProductsControllers } from "../../controllers/products.controller.js";

const router = express.Router();

router.get("/", ProductsControllers.getProducts)

router.post("/" ,ProductsControllers.saveProducts)

router.delete("/:id",ProductsControllers.deleteProduct)

router.put("/:id",ProductsControllers.updateProduct)

export {router as productRouter};