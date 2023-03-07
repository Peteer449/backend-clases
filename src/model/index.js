// import { MongoContainer } from "./managers/mongo.manager.js";
// import { FirebaseContainer } from "./managers/firebase.manager.js";
// import {UserModel} from "./models/user.model.js"

// export const UserManager = new MongoContainer(UserModel)
// export const FirebaseManagerProducts = new FirebaseContainer("products")
// export const FirebaseManagerChat = new FirebaseContainer("mensajes")

import {UserModel} from "./models/user.model.js"
import { MyMongoClient } from "./clients/dbClientMongo.js"
import { MyFirebaseClient } from "./clients/dbClientFirebase.js"
import { options } from "../config/options.js"

export async function getApiDao(dbType){
  let UserManager
  let FirebaseManagerProducts
  let FirebaseManagerChat

  switch (dbType){
    case "firebase":
      const {ProductFirebaseDao} = await import("./daos/productos/productFirebaseDao.js")
      const myFirebaseClient = new MyFirebaseClient()
      await myFirebaseClient.connect(options.firebase.url)
      FirebaseManagerProducts = new ProductFirebaseDao("products")
      FirebaseManagerChat = new ProductFirebaseDao("mensajes")
      break;
    case "mongo":
      const {UserMongoDao} = await import("./daos/users/userMongoDao.js")
      const myClient = new MyMongoClient()
      await myClient.connect(options.mongoCoderdb.url)
      UserManager = new UserMongoDao(UserModel)
      break;
  }
  return {UserManager,FirebaseManagerChat,FirebaseManagerProducts}
}