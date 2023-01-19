import {faker} from "@faker-js/faker"
import admin from "firebase-admin"

const {commerce,image} = faker


export default class productsContainer{
  constructor(){
    this.database = admin.firestore()
    this.collection = this.database.collection("products")
  }

  async save(product){
    let doc = this.collection.doc()
    await doc.create({product})
  }

  async getAll(){
    let all = []
    const snapshot = await this.collection.get()
    let response = snapshot.docs;
    response.map(elm=>{
      all.push(
        {
          id:elm.id,
          ...elm.data().product
        }
      )
    });
    for (let i = 0; i<5; i++){
      all.push(
        {
          id:i,
          title:commerce.product(),
          price:commerce.price(),
          image:image.imageUrl()
        }
      )
    }
    //console.log(all)
    return all
  }
}