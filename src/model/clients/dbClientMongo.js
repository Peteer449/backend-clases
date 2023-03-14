import mongoose from "mongoose"
import { logger } from "../../logger/logger.js"

class MyMongoClient{
  constructor(){
    this.client=mongoose
  }

  async connect(url){
    try {
      mongoose.set('strictQuery', true);
      await this.client.connect(url)
      logger.info("Base de datos mongo conectada")
    } catch (error) {
      logger.error(error)
    }
  }
  async disconnect(){
    try {
      await this.client.connection.close()
      logger.info("Base de datos mongo desconectada")
    } catch (error) {
      logger.error(error)
    }
  }
}

export {MyMongoClient}