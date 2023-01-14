import {faker} from "@faker-js/faker"

const {commerce,image} = faker


export default class productsContainer{
  async getAll(){
    let all = []
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
}