import { envConfig } from "../envConfig.js"
import ParsedArgs from "minimist";

const objArgs = ParsedArgs(process.argv.slice(2), {
    alias:{
        p:"port",
        m:"mode",
        e:"env"
    },
    default:{
        port:8080,
        mode:"fork",
        env:"test"
      }
});

export const options={
  server:{
    PORT:objArgs.port,
    MODE:objArgs.mode,
    ENV:objArgs.env
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