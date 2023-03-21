import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import { rootProducts } from "../services/productsAndChat.services.js";

//contruccion el esquema de graphql
const graphqlSchema = buildSchema(`
    type Product{
        id:String,
        title:String,
        price:Int,
        image:String,
        updated:String
    }
    input ProductInput{
        title:String,
        price:Int,
        image:String
    }
    type Query{
        getProducts: [Product],
        getProductById(id:String): Product
    }
    type Mutation{
        addProduct(product:ProductInput): Product,
        deleteProduct(id:String): String,
        updateProductById(id:String): Product
    }
`);

// graphqlHTTP({
//     schema:graphqlSchema,
//     rootValue:root,
//     graphiql:true
// })

export const graphqlController = ()=>{
    return graphqlHTTP({
        schema:graphqlSchema,
        rootValue:rootProducts,
        graphiql:true
    });
};