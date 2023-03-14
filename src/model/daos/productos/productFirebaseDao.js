import { FirebaseContainer } from "../../managers/firebase.manager.js";

class ProductFirebaseDao extends FirebaseContainer{
  constructor(collection){
    super(collection)
  }
}

export {ProductFirebaseDao}