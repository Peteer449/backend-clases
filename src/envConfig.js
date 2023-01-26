import * as dotenv from "dotenv"
dotenv.config()
export const envConfig={
  BASE_DE_DATOS_CODERDB:process.env.BASE_DE_DATOS_CODERDB,
  BASE_DE_DATOS_SESSIONSDB:process.env.BASE_DE_DATOS_SESSIONSDB,
  BASE_DE_DATOS_FIREBASE:process.env.BASE_DE_DATOS_FIREBASE
}