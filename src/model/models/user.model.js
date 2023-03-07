import mongoose from "mongoose";

const userCollection = "users"

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  mail:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  }
})

export const UserModel = mongoose.model(userCollection,UserSchema)