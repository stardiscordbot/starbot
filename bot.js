// Coisas Importantes
require('./functions/quote.js')
require('./src/mongodb/blacklist.js')
// Discord
const webhook = require("./src/jsons/webhooks.json")
const Discord = require("discord.js")
const star = new Discord.WebhookClient(webhook.watchdogs.id, webhook.watchdogs.token)
// Dependencias
const { Player } = require("./npms/discord-player/index.js");
// Give
const config = require('./src/config.json')
// Client
const client = new Discord.Client({
  shardCount: 2,
  disableMentions: 'everyone'
});
// Player
const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: true,
  leaveOnEmpty: true,
  timeout: 0,
  quality: 'high',
});
client.player = player;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// Mais depêndencias
const fs = require('fs');
const mongoose = require('mongoose')
const c = require('colors');
// Arquivos
const bldb = require("./src/mongodb/blacklist.js");
const dc = require('./src/mongodb/dc.js')
const pr = require("./src/mongodb/prefix");
const autorole = require('./src/mongodb/autorole.js');
const welcomeChannel = require('./src/mongodb/WelcomeChannel.js');
const logChannel = require('./src/mongodb/messagelog.js');
const Money = require("./src/mongodb/money.js");
const antilink = require('./src/mongodb/antilink');
// Outras Depêndencias
const moment = require("moment");
const ms = require('ms');
const DBL = require("dblapi.js");
const glob = require('glob')
// Embeds
const commandembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('**[COMANDOS] - Carregados com sucesso**')
.setColor('ff0000')

const eventembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('**[EVENTOS] - Carregados com sucesso**')
.setColor('YELLOW')

const dblembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('**[DBL] - Servidores Postados**')
.setColor('BLUE')

const dbembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('**[BANCO DE DADOS] - Banco de dados foi ligado**')
.setColor('ffc600')
// Dbl Status
const dbl = new DBL(config.dbl, client);

dbl.on('posted', () => {
  console.log(c.green('[DBL] - Servidores Postados'));
  star.send(dblembed)
})

dbl.on('error', e => {
  const dblerror = new Discord.MessageEmbed()
  .setTitle('Star™ | Status')
  .setDescription(`**[DBL ERROR] - ${e}**`)
  .setColor('RED')

 console.log(c.red(`[DBL] - ${e}`));
 star.send(dblerror)
})
// Conectando a database
mongoose.connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then (function () {
    console.log(c.brightYellow("[BANCO DE DADOS] - Banco de dados foi ligado"))
    star.send(dbembed)
  }).catch (function () {
    console.log(c.brightRed("[BANCO DE DADOS] - Banco de dados desligado por erro"))
  });

// Handler
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
    star.send(commandembed)
})

// Handler de Eventos
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
  star.send(eventembed)
});
// Logando
client.login(config.token)
// Exportando o Client
module.exports = {client, star}
// Ligando a Star Helper
const bot = require('./bots/starhelper/bot.js');
const client2 = bot.init(config.token);
// Ligando a Star Premium
const bot2 = require('./bots/starpremium/bot.js');
const client3 = bot2.init(config.token);
// Ligando o Backup
const bot3 = require('./bots/star-instância/bot.js')
const client4 = bot3.init(config.token);