import {readFileSync} from "fs"
import admin from "firebase-admin"
const serviceAccount = JSON.parse(readFileSync("../firebaseKey.json"))
admin.initializeApp(
  {
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://ecommerce-673af.firebase.io"
  }
)


export default class chatContainer{
  constructor(){
    this.filename = "./DB/chatLog.txt"
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

