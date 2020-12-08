// Coisas Importantes
require('./quote.js')
require('./mongodb/blacklist.js')
// Dep}endencias
const {Player} = require('./musica/index.js')
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
  // Api de Votos Zuraaa
  const webvotos = new Discord.WebhookClient(config.votosID, config.votosTOKEN)
  client.on('message', message => {
    // Quantidade de dinheiro adicionada ao votante
    let dailyCoins = 250;
    // Puxando o VerificaVotos
    votosZuraaa.verificaVotos(message, function(user){
      // Embed do user
        const obrigado = new Discord.MessageEmbed()
        .setTitle('🎉 Obrigado pelo seu Voto!')
        .setDescription(`Obrigada por votar em mim, cada voto me ajuda a crescer!`)
        .setColor(config.color)
        user.send(obrigado);
        // Embed do webhook
        const voted = new Discord.MessageEmbed()
        .setTitle('🥳 Obrigado pelo seu Voto!')
        .setDescription(`\`${user.tag}\` votou em mim! Vote você também e seja uma pessoa incrível!\nhttps://zuraaa.com/bots/719524114536333342/votar`)
        .setColor(config.color)
        webvotos.send(voted)
      // Fim
        });
    });

/*
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
*/

// Handler
fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(c.red('[ERRO] - ', err));
  
    let arquivojs = files.filter(f => f.split(".").pop() == "js");
    arquivojs.forEach((f, i) => {
      let props = require(`./comandos/${f}`);
      console.log(c.brightBlue(`-----------------------COMANDOS-----------------------\n[COMANDOS] - ${f} ✓\n-----------------------COMANDOS-----------------------`));
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  // Handler de Eventos
fs.readdir("./eventos/", (err, files) => {
  if(err)
      console.error(err);
  const eventsFiles = files.filter(file => file.split(".").pop() == "js");
  if(eventsFiles.length <= 0)
      return console.warn(c.brightRed("-----------------------EVENTOS-----------------------\n[EVENTOS] - Não existem eventos para ser carregado\n-----------------------EVENTOS-----------------------"));
  eventsFiles.forEach((file, i) => {
      require("./eventos/" + file);
  })
  console.log(c.brightCyan("-----------------------EVENTOS-----------------------\n[EVENTOS] - Carregados com sucesso\n-----------------------EVENTOS-----------------------"))
});

client.login(config.token)
module.exports = {client}