import twilio from "twilio"

const accountId = "AC0ca3aacecb921c21d262e8afef773cf8"
const tokenTwilio = "ade14a621e3ee996446a6da92b7d26d3"

const twilioPhone = "whatsapp:+14155238886"
const adminPhone = "whatsapp:+5491167056074"

const twilioClient = twilio(accountId,tokenTwilio)

export {twilioClient,twilioPhone,adminPhone}