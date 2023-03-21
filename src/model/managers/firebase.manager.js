import admin from "firebase-admin"
import {faker} from "@faker-js/faker"

const {commerce,image} = faker

class FirebaseContainer{
  constructor(collection){
        this.database = admin.firestore()
        this.collection = this.database.collection(collection)
      }      
      
      async getById(id){
        try {
            const product =  this.collection.doc(`${id}`);
            const item = await product.get()
            const response = item.data()
            return {id:id,...response}
        } catch (error) {
            return {message:`Hubo un error ${error}`, error:true};
        }
    }

    async getAll(){
        try {
            const snapshot =await this.collection.get()
            let response = snapshot.docs;
            let results = response.map(elm=>{
                return {
                    id:elm.id,
                    ...elm.data()
                }
            });
            return results;
        } catch (error) {
            return [];
        }
    }

    async getAllProducts(){
      let all = []
      const snapshot = await this.collection.get()
      let response = snapshot.docs;
      response.map(elm=>{
        all.push(
          {
            id:elm.id,
            ...elm.data()
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
      return all
    }

    async save(product,bool){
        try {
            if(product.price){
                let {title,price,image}=product
                price=parseInt(price)
                let doc = this.collection.doc()
                const addDoc = await this.collection.add({title,price,image})
                return {id:addDoc._path.segments[1],title,price,image}
            }else if(product.timestamp){
                if(bool){
                    const snapshot =await this.collection.get()
                    let response = snapshot.docs;
                    let results = response.map(elm=>{
                        return {
                            id:elm.id,
                            ...elm.data()
                        }
                    });
                    let oldProducts = results[0].product.products
                    let doc = this.collection.doc(`${results[0].id}`)
                    let newProduct=product.products[0]
                    oldProducts.push(newProduct)
                    await doc.update({product:{products:oldProducts,timestamp:product.timestamp}})
                }else{
                    let doc = this.collection.doc()
                    await doc.create({product})
                }
            }
            return this.getAll()
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(id){
        try {
            const doc = this.collection.doc(`${id}`)
            await doc.update({updated:true})
            return this.getById(id)
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            const doc = this.collection.doc(`${id}`)
            await doc.delete()
            return {message:"deleted successfully"}
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            await this.collection.doc().deleteAll();
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }

}

export {FirebaseContainer}