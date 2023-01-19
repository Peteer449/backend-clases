import {readFileSync} from "fs"
import admin from "firebase-admin"
const serviceAccount = JSON.parse(readFileSync("../firebaseKey.json"))
import { envConfig } from "./envconfig.js"

admin.initializeApp(
  {
    credential:admin.credential.cert(serviceAccount),
    databaseURL:envConfig.BASE_DE_DATOS_FIREBASE
  }
)


export default class chatContainer{
  constructor(){
    this.database = admin.firestore()
    this.collection = this.database.collection("mensajes")
  }

  async save(chatObj){
    let doc = this.collection.doc()
    await doc.create({chatObj})
}
async getAll(){
    const snapshot =await this.collection.get()
    let response = snapshot.docs;
    let results = response.map(elm=>{
        return {
            id:elm.id,
            ...elm.data().chatObj
        }
    });
    return results;
}
}

