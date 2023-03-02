import express from "express";
import { transporter,adminEmail } from "../../messages/email.js"
import {twilioClient, twilioPhone, adminPhone} from "../../messages/wpp.js"

const router = express.Router();
router.post("/email",async (req,res)=>{
  try {
    await transporter.sendMail({
      from:"server app Node",
      to:adminEmail,
      subject:"Email de prueba",
      html:"<div>Holo</div>"
    })
    res.send("el mensaje se envio correctamente")
  } catch (error) {
    res.send(error)
  }
})

router.post("/wpp", async(req,res)=>{
  try {
    await twilioClient.messages.create({
      from:twilioPhone,
      to:adminPhone,
      body:"algo"
    })
    res.send("el mensaje se envio correctamente")
  } catch (error) {
    res.send(error)
  }
})

export {router as messagesRouter};