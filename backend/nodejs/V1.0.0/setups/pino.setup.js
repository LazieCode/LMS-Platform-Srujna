const pino = require('pino')
const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
  };
  
  // create a Pino logger
  const logger = pino({
    customLevels: levels,
    useOnlyCustomLevels: true,
    level: "http"
  });
  
  module.exports =  logger;