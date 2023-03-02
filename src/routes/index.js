import express from "express";
import { logger } from "../logger/logger.js";
import os from "os"
import { fork } from "child_process"
import { productRouter } from "./api/products.routes.js";
import { loginRouter } from "./api/login.routes.js";
import {signupRouter} from "./api/signup.routes.js"
import { messagesRouter } from "./api/message.routes.js";

const router = express.Router()

router.get('/', (req, res) => {
  if(req.session.user){
    let user = req.session.user.name
    res.render("home",{user})
  }
  else{
    res.redirect("/log/login")
  }
  logger.info("Ruta: "+req.url+"  Metodo: GET")
});

router.get("/info",(req,res)=>{
  const {argv,platform,versions,pid,execPath,memoryUsage} = process
  res.json(
    {
      plataforma:platform,
      versionNode:versions.node,
      RSS:memoryUsage.rss(),
      pathEjecucion:execPath,
      processID:pid,
      carpetaProyecto:argv[1],
      procesadores:os.cpus().length
    }
  )
})

router.get("/profile",(req,res)=>{
  res.render("profile")
})

router.get("/api/randoms",(req,res)=>{
  const child = fork("./src/apiRandoms.js")
  if(req.query.cant){
    child.send(req.query.cant)
  }else{
    child.send(100)
  }
  child.on("message",childNumbers=>{
    res.json({...childNumbers})
  })
})

router.use("/api/products", productRouter)
router.use("/log", loginRouter)
router.use("/signup", signupRouter)
router.use("/message", messagesRouter)

export {router}