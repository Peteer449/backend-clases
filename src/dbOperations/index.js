import { MongoContainer } from "./managers/mongo.manager.js";
import { FirebaseContainer } from "./managers/firebase.manager.js";
import {UserModel} from "./models/user.model.js"

export const UserManager = new MongoContainer(UserModel)
export const FirebaseManagerProducts = new FirebaseContainer("products")
export const FirebaseManagerChat = new FirebaseContainer("mensajes")