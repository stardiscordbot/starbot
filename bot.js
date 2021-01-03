// Coisas Importantes
require('./functions/quote.js')
require('./src/mongodb/blacklist.js')
// Dependencias
const { Player } = require("./npms/discord-player/index.js");
const { GiveawaysManager } = require('discord-giveaways');
// Shard
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
  async refreshStorage() {
      return client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
  }
};
// Give
const Discord = require('discord.js')
const backup = require('./npms/discord-backup/lib/index.js')
const config = require('./src/config.json')
// Client
const client = new Discord.Client({
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: true,
  timeout: 0,
  quality: 'high',
});
const player = new Player(client, {
  leaveOnEmpty: true,
});
client.player = player;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// Giveaway
const manager = new GiveawayManagerWithShardSupport(client, {
  storage: './src/jsons/giveaways.json',
  updateCountdownEvery: 10000,
  default: {
      botsCanWin: false,
      exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR', 'MANAGE_GUILD'],
      embedColor: '#FF0000',
      reaction: '🥳'
  }
});
// Manager
client.giveawaysManager = manager;
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
// Dbl Status
const dbl = new DBL(config.dbl, client);

dbl.on('posted', () => {
  console.log(c.green('[DBL] - Servidores Postados!'));
})

dbl.on('error', e => {
 console.log(c.red(`[DBL] - ${e}`));
})
// Conectando a database
mongoose.connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then (function () {
    console.log(c.brightYellow("[BANCO DE DADOS] - Banco de dados foi ligado"))
  }).catch (function () {
    console.log(c.brightRed("[BANCO DE DADOS] - Banco de dados desligado por erro"))
  });

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
      let prefix = res ? res.prefix : config.prefix;
    if (message.content.startsWith(prefix)) {
          message.quote(`<a:alerta:763434977412120586> | ${message.author} Você está usando a versão experimental da Star:tm:. Várias funcionalidades podem não funcionar, posso ficar offline a qualquer momento, seu servidor pode explodir e muito mais! Não reporte problemas da versão experimental caso não seja solicitado, obrigada!`).then(msg => {
            msg.delete({timeout:5000})
          })
    }
  })
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
});
// Logando
client.login(config.token)
// Exportando o Client
module.exports = {client}
// Ligando a Star Helper
const bot = require('./bots/starhelper/bot.js');
const client2 = bot.init(config.token);
// Ligando a Star Premium
const bot2 = require('./bots/starpremium/bot.js');
const client3 = bot2.init(config.token);
// Ligando o Backup
const bot3 = require('./bots/star-instância/bot.js')
const client4 = bot3.init(config.token);