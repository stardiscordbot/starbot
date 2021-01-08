const c = require('colors');
require('./functions/quote.js')
require('./src/mongodb/blacklist.js')
// Coisas Importantes
console.log(c.yellow('[STARBOT] - Iniciando Conexão'))
// Dependencias
const { Manager } = require('erela.js')
const player = require('./src/jsons/player.json')
const Discord = require('discord.js')
const config = require('./src/config.json')
// Client
const client = new Discord.Client({
  shardCount: 2,
  disableMentions: 'everyone'
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// Mais depêndencias
const fs = require('fs');
const mongoose = require('mongoose')
// Arquivos
const pr = require("./src/mongodb/prefix");
// Outras Depêndencias
const DBL = require("dblapi.js");
const glob = require('glob')
// Dbl Status
const dbl = new DBL(config.dbl, client);
dbl.on('posted', () => {
  console.log(c.green('[DBL] - Servidores Postados!'));
})
dbl.on('error', e => {
 console.log(c.red(`[DBL] - ${e}`));
})

const nodes = [
  {
    host: player.host,
    password: player.senha,
    port: 2333,
  }
];

client.manager = new Manager({
  nodes,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
});

client.manager.on("nodeConnect", node => {
    console.log(c.yellow(`[NODES] - Node "${node.options.identifier}" conectado.`))
})

client.manager.on("nodeError", (node, error) => {
    console.log(c.red(`[NODES] - Node "${node.options.identifier}" teve um erro: ${error.message}.`))
})

client.once("ready", () => {
  console.log(c.yellow(`[NODES] - Iniciando conexão dos nodes`))
  client.manager.init(client.user.id);
});

mongoose.connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then (function () {
    console.log(c.brightYellow("[BANCO DE DADOS] - Banco de dados foi ligado"))
  }).catch (function () {
    console.log(c.brightRed("[BANCO DE DADOS] - Banco de dados desligado por erro"))
  });

  glob(__dirname+'/src/commands/*/*.js', function (er, files) {
    if(er) console.log(er)
    files.forEach(f => {
        let props = require(`${f.replace('.js', '')}`)
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
        });
        })
    console.log("[COMANDOS] - Carregados com sucesso".brightCyan)
})

fs.readdir("./src/events/", (err, files) => {
  if(err)
      console.error(err);
  const eventsFiles = files.filter(file => file.split(".").pop() == "js");
  if(eventsFiles.length <= 0)
      return console.warn(c.brightRed("[EVENTS] - Não existem eventos para ser carregados"));
  eventsFiles.forEach((file, i) => {
      require("./src/events/" + file);
  })
  console.log(c.brightCyan("[EVENTOS] - Carregados com sucesso"))
});

client.login(config.token)
module.exports = {client}