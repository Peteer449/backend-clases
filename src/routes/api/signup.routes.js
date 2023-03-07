import express from "express";
import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy} from "passport-local";
import { UserService } from "../../services/user.services.js";
import { UserModel } from "../../model/models/user.model.js";

const router = express.Router();

router.get("/",(req,res)=>{
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

router.post("/", passport.authenticate("signupStrategy",{
  failureRedirect:"/signup",
  failureMessage:true,
  failureFlash:true
}),(req,res)=>{
  res.redirect("/log/login")
})

export {router as signupRouter};