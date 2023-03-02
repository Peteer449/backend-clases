import { envConfig } from "../envConfig.js"
export const options={
  mongoSessions:{
    url:envConfig.BASE_DE_DATOS_SESSIONSDB
  },
  mongoCoderdb:{
    url:envConfig.BASE_DE_DATOS_CODERDB
  },
  firebase:{
    url:envConfig.BASE_DE_DATOS_FIREBASE
  }
}