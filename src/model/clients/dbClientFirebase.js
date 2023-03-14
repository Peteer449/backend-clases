import {readFileSync} from "fs"
import admin from "firebase-admin"
const serviceAccount = JSON.parse(readFileSync("firebaseKey.json"))
import { logger } from "../../logger/logger.js"

class MyFirebaseClient{
  constructor(){
    this.client=admin
  }

  async connect(url){
    try {
      await this.client.initializeApp(
        {
          credential:admin.credential.cert(serviceAccount),
          databaseURL:url
        }
      )
      logger.info("Base de datos firebase conectada")
    } catch (error) {
      logger.error(error)
    }
  }
  async disconnect(){
    try {
      await this.client.off()
      logger.info("Base de datos firebase desconectada")
    } catch (error) {
      logger.error(error)
    }
  }
}

export {MyFirebaseClient}