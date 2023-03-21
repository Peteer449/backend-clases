import express from "express"
import { envConfig } from "./envConfig.js"
import {Server} from "socket.io"
import path from "path"
import bodyParser from "body-parser"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { normalize, schema } from "normalizr";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { UserModel } from "./model/models/user.model.js";
import flash from "connect-flash"
import os from "os"
import cluster from "cluster"
import compression from "compression"
import { logger } from "./logger/logger.js"
import {connectMongoSession} from "./config/dbConnection.js"
import {router} from "./routes/index.js"
import { options } from "./config/options.js"
import { graphqlController } from "./controllers/products.graphql.controller.js"

const app = express()
export {app}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.engine("handlebars",handlebars.engine())
app.set("views",path.join(__dirname,"views"))
app.set("view engine","handlebars")
app.use(express.static("./views"))
app.use(cookieParser())
app.use(flash())
app.use(compression())

/*

-------COOKIES AND MONGODB-------

*/
app.use(session(connectMongoSession()))


/*

-------PASSPORT CONFIG-------

*/

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user,done)=>{
  return done(null,user.id)
})
passport.deserializeUser((id,done)=>{
  UserModel.findById(id,(error,userFound)=>{
    return done(error,userFound)
  })
})

//Port of the server
const PORT = options.server.PORT
const MODO = options.server.MODE

//Import classes
import { ProductsService, ChatService } from "./services/productsAndChat.services.js"


//Server listener
let server
const numberCpus = os.cpus().length
if(envConfig.PORT){
  server = app.listen(envConfig.PORT,()=>logger.info(`Server listening on port ${envConfig.PORT}`))
}else{
  if(cluster.isPrimary && MODO=="cluster"){
    for(let i = 0; i<numberCpus;i++){
      cluster.fork()
    }
    cluster.on("exit",worker=>{
      logger.info(`Este subproceso (${worker.process.pid}) dejo de funcionar`)
      cluster.fork()
    })
  }else{
    server = app.listen(PORT,()=>logger.info(`Server listening on port ${PORT} on process ${process.pid}`))
  }
}

/*

-------SERVER AND CHAT-------

*/


//Create websocket server
const io = new Server(server)

//Normalizar
const authorSchema = new schema.Entity("authors",{},{idAttribute:"email"})//id:con el valor del campo email.
const messageSchema = new schema.Entity("messages",
    {
        author:authorSchema
    }
)
const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
})
const normalizarData = (data)=>{
  const dataNormalizada = normalize({id:"chatHistory", messages:data}, chatSchema)
  return dataNormalizada;
}
const normalizarMensajes = async()=>{
  const messages = await ChatService.getChat()
  const normalizedMessages = normalizarData(messages)
  return normalizedMessages
}

io.on("connection",async (socket)=>{
  socket.emit("allMessages",await normalizarMensajes())
  socket.emit("allProducts",await ProductsService.getProducts())
  socket.on("chatInput",async data=>{
    await ChatService.save(data)
    io.sockets.emit("allMessages",await normalizarMensajes())
  })
})


/*

-------ROUTES-------

*/
app.use("" , router)
app.use("/graphql",graphqlController())