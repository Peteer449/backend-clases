import express from "express"
import { envConfig } from "./envconfig.js"
import {Server} from "socket.io"
import path from "path"
import bodyParser from "body-parser"
import {fileURLToPath} from 'url';
import handlebars from "express-handlebars"
import { normalize, schema } from "normalizr";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"; 
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import mongoose from "mongoose";
import { UserModel } from "./models/user.js";
import bcrypt from "bcrypt"
import flash from "connect-flash"
import parseArgs from "minimist"
import { fork } from "child_process"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.engine("handlebars",handlebars.engine())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views",path.join(__dirname,"views"))
app.set("view engine","handlebars")
app.use(express.static("./views"))
app.use(cookieParser())
app.use(flash())
const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}


/*

-------COOKIES AND MONGODB-------

*/
app.use(session({
  store: MongoStore.create({
    mongoUrl:envConfig.BASE_DE_DATOS_SESSIONSDB,
    mongoOptions:advancedOptions,
    ttl:60
  }),
  secret:"clave",
  resave:false,
  saveUninitialized:false
}))
mongoose.connect(envConfig.BASE_DE_DATOS_CODERDB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
},(error=>{
  if(error)console.log("Conexion fallida")
  console.log("conectado correctamente")
}))


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
const optionsMinimist = {default:{p:8080},alias:{p:"port"}}
const argumentsMinimist = parseArgs(process.argv.slice(2),optionsMinimist)
const PORT = argumentsMinimist.port

//Import classes
import productsContainer from "./productsContainer.js";
import chatContainer from "./chatContainer.js";
const productsClass = new productsContainer()
const chatClass = new chatContainer()

//Server listener
const server = app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))


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
  const messages = await chatClass.getAll()
  const normalizedMessages = normalizarData(messages)
  return normalizedMessages
}

io.on("connection",async (socket)=>{
  socket.emit("allMessages",await normalizarMensajes())
  socket.emit("allProducts",await productsClass.getAll())
  socket.on("chatInput",async data=>{
    await chatClass.save(data)
    io.sockets.emit("allMessages",await normalizarMensajes())
  })
})


/*

-------ROUTES-------

*/


app.get('/', (req, res) => {
  if(req.session.user){
    let user = req.session.user.name
    res.render("home",{user})
  }
  else{
    res.redirect("/login")
  }
});

app.get("/profile",(req,res)=>{
  res.render("profile")
})

app.get("/api/productos-test",async (req,res)=>{
  const allProducts = await productsClass.getAll()
  res.render("products",{allProducts})
})

app.post("/api/productos-test" , async(req,res)=>{
  const {title,price,image} = req.body
  console.log(title,price,image)
  console.log(req.body )
  await productsClass.save({title,price,image})
  res.redirect("/api/productos-test")
})

app.get("/info",(req,res)=>{
  const {argv,platform,versions,pid,execPath,memoryUsage} = process
  res.json(
    {
      argumentosDeEntrada:argumentsMinimist,
      plataforma:platform,
      versionNode:versions.node,
      RSS:memoryUsage.rss(),
      pathEjecucion:execPath,
      processID:pid,
      carpetaProyecto:argv[1]
    }
  )
})

app.get("/api/randoms",(req,res)=>{
  const child = fork("apiRandoms.js")
  if(req.query.cant){
    child.send(req.query.cant)
  }else{
    child.send(100000000)
  }
  child.on("message",childNumbers=>{
    res.json({...childNumbers})
  })
})


/* 

-------LOGIN LOGOUT-------

*/

app.get("/login",(req,res)=>{
  if(req.session.username){
    return res.send("Ya estas logueado")
  }
  if(req.session.username){
    res.redirect("/")
  }
  else{
    res.render("login",{error:req.flash('error')[0]})
  }
})

app.get("/logout",(req,res)=>{
  const user = req.session.user
  req.session.destroy(error=>{
    if(!error)return res.render("logout",{user:user.name})
    res.send(`Error: ${error}`).status(500)
  })
})

passport.use("loginStrategy",new LocalStrategy(
  {
    usernameField:"mail"
  },
  (username,password,done)=>{
    UserModel.findOne({mail:username},(err,userFound)=>{
      if(err) return done(err)
      if(!userFound)return done(null,false,{message:"No se encontro el usuario"})
      if(userFound){
        bcrypt.compare(password, userFound.password, function(err, result) {
          if(result){
            return done(null,userFound)
          }
          return done(null,false,{message:"Contraseña incorrecta"})
      });
      }
    })
  }
))

app.post("/login",passport.authenticate("loginStrategy",{
  failureRedirect:"/login",
  failureMessage:true,
  failureFlash: true
}), async (req,res)=>{
  req.session.user = req.user
  res.redirect("/")
})


/*

-------SIGNUP-------

*/


app.get("/signup",(req,res)=>{
  res.render("signup",{error:req.flash('error')[0]})
})

passport.use("signupStrategy",new LocalStrategy(
  {
    passReqToCallback:true,
    usernameField:"mail",
  },
  (req,username,password,done)=>{
    UserModel.findOne({mail:username},(err,userFound)=>{
      if(err) return done(err)
      if(userFound)return done(null,false,{message:"El usuario ya existe"})
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          const newUser = {
            name:req.body.name,
            mail:username,
            password:hash
          }
          UserModel.create(newUser,(error,userCreated)=>{
            if(err)return done(error,null,{message:"Error al crear el usuario"})
            return done(null,userCreated)
          })
        })
      })
    })
  }
))

app.post("/signup", passport.authenticate("signupStrategy",{
  failureRedirect:"/signup",
  failureMessage:true,
  failureFlash:true
}),(req,res)=>{
  res.redirect("/login")
})