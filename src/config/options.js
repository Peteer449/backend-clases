import { envConfig } from "../envConfig.js"
import ParsedArgs from "minimist";

const objArgs = ParsedArgs(process.argv.slice(2), {
    alias:{
        p:"port",
        m:"mode"
    },
    default:{
        port:8080,
        mode:"fork"
      }
});

export const options={
  server:{
    PORT:objArgs.port,
    MODE:objArgs.mode,
  },
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