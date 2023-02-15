import nodemailer from "nodemailer"

const adminEmail='pedro.esposito99@gmail.com'
const adminPassword='bmpuuglmiideziwh'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: adminEmail,
      pass: adminPassword
  },
  secure:false,
  tls:{
    rejectUnauthorized:false
  }
});

export {transporter,adminEmail}