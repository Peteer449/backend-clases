import admin from "firebase-admin"


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

