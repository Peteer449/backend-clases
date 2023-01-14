import {readFileSync} from "fs"
import admin from "firebase-admin"
const serviceAccount = JSON.parse(readFileSync("../firebaseKey.json"))



export default class sessionsContainer{
  constructor(){
    this.database = admin.firestore()
    this.collection = this.database.collection("sessions")
  }

  async save(session){
    let doc = this.collection.doc()
    await doc.create({session})
  }
  async getAll(){
      const snapshot =await this.collection.get()
      let response = snapshot.docs;
      let results = response.map(elm=>{
          return {
              id:elm.id,
              ...elm.data().session
          }
      });
      return results;
  }
}