import axios from "axios";
import { logger } from "./logger/logger.js";

const URL = "http://localhost:8080"
let productId

const getProducts = async ()=>{
  try {
    const response = await axios.get(`${URL}/api/products`)
    console.log(response.data)
  } catch (error) {
    logger.error(error)
  }
}

const addProduct = async ()=>{
  try {
    const response = await axios.post(`${URL}/api/products`,{title:"test",price:200,image:"image"})
    productId = response.data.data[0].id
    console.log(response.data)
  } catch (error) {
    logger.error(error)
  }
}
const updateProduct = async ()=>{
  try {
    const response = await axios.put(`${URL}/api/products/${productId}`)
    console.log(response.data)
  } catch (error) {
    logger.error(error)
  }
}
const deleteProduct = async ()=>{
  try {
    const response = await axios.delete(`${URL}/api/products/${productId}`)
    console.log(response.data)
  } catch (error) {
    logger.error(error)
  }
}

addProduct()
setTimeout(() => {
  getProducts()
  updateProduct()
  setTimeout(() => {
    deleteProduct()
  }, 2000);
}, 2000);