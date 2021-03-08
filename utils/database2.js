const config = require("../src/config/json/config.json")
const {connect} = require("mongoose")

connect(config.database.mongo.url, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (function () {
    //console.log(c.brightYellow(`[BANCO DE DADOS] A MongoDB foi concetada com sucesso`))
}).catch (function () {
    //console.log(c.brightRed(`[BANCO DE DADOS] Database2 ligada com sucesso.`))
});