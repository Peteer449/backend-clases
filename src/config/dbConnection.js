import mongoose from "mongoose";
import {options} from "./options.js"
import { logger } from "../logger/logger.js";
import MongoStore from "connect-mongo";


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

export {connectCoderdb, connectMongoSession}