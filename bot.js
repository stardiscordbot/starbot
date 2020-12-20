// Coisas Importantes
require('./functions/quote.js')
require('./mongodb/blacklist.js')
// Dependencias
const {Player} = require("discord-music-player");
const Discord = require('discord.js')
const backup = require('./discord-backup/lib/index.js')
const config = require('./config.json')
// Client
const client = new Discord.Client({ disableMentions: 'everyone'});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// Mais depêndencias
const fs = require('fs');
const mongoose = require('mongoose')
const c = require('colors');
// Arquivos
const bldb = require("./mongodb/blacklist.js");
const dc = require('./mongodb/dc.js')
const pr = require("./mongodb/prefix");
const autorole = require('./mongodb/autorole.js');
const welcomeChannel = require('./mongodb/WelcomeChannel.js');
const votosZuraaa = require('./votosZuraaa.js');
const logChannel = require('./mongodb/messagelog.js');
const Money = require("./mongodb/money.js");
const antilink = require('./mongodb/antilink');
// Outras Depêndencias
const moment = require("moment");
const ms = require('ms');
const DBL = require("dblapi.js");
// Dbl Status
const dbl = new DBL(config.dbl, client);

dbl.on('posted', () => {
  console.log(c.green('-----------------------DBL-----------------------\n[DBL] - Servidores Postados!\n-----------------------DBL-----------------------'));
})

dbl.on('error', e => {
 console.log(c.red(`[DBL] - ${e}`));
})
// Conectando a database
mongoose.connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then (function () {
    console.log(c.brightYellow("-----------------------MONGOOSE-----------------------\n[BANCO DE DADOS] - Banco de dados foi ligado\n-----------------------MONGOOSE-----------------------"))
  }).catch (function () {
    console.log(c.brightRed("-----------------------MONGOOSE-----------------------\n[BANCO DE DADOS] - Banco de dados desligado por erro\n-----------------------MONGOOSE-----------------------"))
  });

client.on('message', message => {
    if (message.author.bot) return;
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
      let prefix = res ? res.prefix : config.prefix;
    if (message.content.startsWith(prefix)) {
          message.quote(`<a:alerta:763434977412120586> | ${message.author} Você está usando a versão experimental da Star:tm:. Várias funcionalidades podem não funcionar, posso ficar offline a qualquer momento, seu servidor pode explodir e muito mais! Não reporte problemas da versão experimental caso não seja solicitado, obrigada!`).then(msg=> {
            msg.delete({ timeout: 5000, reason: "pq sim" });
            })
    }
  })
});
// Handler
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(c.red('[ERRO] - ', err));
    let arquivojs = files.filter(f => f.split(".").pop() == "js");
    arquivojs.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(c.brightBlue(`-----------------------COMMANDS-----------------------\n[COMMANDS] - ${f} ✓\n-----------------------COMMANDS-----------------------`));
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
// Handler de Eventos
fs.readdir("./events/", (err, files) => {
  if(err)
      console.error(err);
  const eventsFiles = files.filter(file => file.split(".").pop() == "js");
  if(eventsFiles.length <= 0)
      return console.warn(c.brightRed("-----------------------EVENTS-----------------------\n[EVENTS] - Não existem eventos para ser carregado\n-----------------------EVENTS-----------------------"));
  eventsFiles.forEach((file, i) => {
      require("./events/" + file);
  })
  console.log(c.brightCyan("-----------------------EVENTOS-----------------------\n[EVENTOS] - Carregados com sucesso\n-----------------------EVENTOS-----------------------"))
});
// Logando
client.login(config.token)
// Exportando o Client
module.exports = {client}