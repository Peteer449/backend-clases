import supertest from "supertest";
import {expect} from "chai";
import { app } from "../server.js";

const request = supertest(app)

describe("pruebas de la api de productos",()=>{
  let responseCreate;
  beforeEach(async()=>{
    const productTest = {title:"test",price:200,image:"image"}
    responseCreate = await request.post("/api/products").send(productTest)
  });
  afterEach(async()=>{
    await request.delete(`/api/products/${responseCreate.body.data[0].id}`)
  });

  it("get products endpoint",async()=>{
    const response = await request.get("/api/products")
    expect(response.status).equal(200)
    expect(response.body).to.have.own.property("data")
  })

  it("post products endpoint",async()=>{
    expect(responseCreate.status).equal(200)
    expect(responseCreate.body.data[0]).to.have.own.property("id")
  })

  it("put products endpoint",async()=>{
    const response = await request.put(`/api/products/${responseCreate.body.data[0].id}`)
    expect(response.status).equal(200)
    expect(response.body.data.updated).equal(true)
  })

  it("delete products endpoint",async()=>{
    const response = request.del(`/api/products/${responseCreate.body.data[0].id}`).send({message:"delete successful"})
    expect(response._data.message).to.equal("delete successful")
  })
})
