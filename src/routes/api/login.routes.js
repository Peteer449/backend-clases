import express from "express";
import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy} from "passport-local";
import { UserService } from "../../services/user.services.js";
import { UserModel } from "../../dbOperations/models/user.model.js";

const router = express.Router();

router.get("/login",(req,res)=>{
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

router.get("/logout",(req,res)=>{
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

router.post("/login",passport.authenticate("loginStrategy",{
  failureRedirect:"/log/login",
  failureMessage:true,
  failureFlash: true
}), async (req,res)=>{
  req.session.user = req.user
  res.redirect("/")
})

export {router as loginRouter};