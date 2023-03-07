import mongoose from "mongoose";
import {options} from "./options.js"
import { logger } from "../logger/logger.js";
import MongoStore from "connect-mongo";
import {readFileSync} from "fs"
import admin from "firebase-admin"
const serviceAccount = JSON.parse(readFileSync("firebaseKey.json"))


const connectCoderdb = () => {
  mongoose.connect(options.mongoCoderdb.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  },(error=>{
    if(error)logger.error("Conexion fallida")
    logger.info("conectado correctamente")
  }))
}

const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}
const connectMongoSession = () => {
  return({
    store: MongoStore.create({
      mongoUrl:options.mongoSessions.url,
      mongoOptions:advancedOptions,
      ttl:60
    }),
    secret:"clave",
    resave:false,
    saveUninitialized:false
  })
}

// admin.initializeApp(
//   {
//     credential:admin.credential.cert(serviceAccount),
//     databaseURL:options.firebase.url
//   }
// )


export {connectCoderdb, connectMongoSession}