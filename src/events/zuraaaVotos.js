const {client} = require("../../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const { verificaVotos } = require("votos-zuraaa")
const logChannel = require('../mongodb/messagelog.js');
const Money = require("../mongodb/money.js");
const antilink = require('../mongodb/antilink');
// Inicio do Code
  const webvotos = new Discord.WebhookClient(config.votosID, config.votosTOKEN)
  client.on('message', message => {
    let dailyCoins = 250;
    verificaVotos(message, function(user){
        const obrigado = new Discord.MessageEmbed()
        .setTitle('🎉 Obrigado pelo seu Voto!')
        .setDescription(`Obrigada por votar em mim, cada voto me ajuda a crescer!`)
        .setColor(config.color)
        user.send(obrigado);
        const voted = new Discord.MessageEmbed()
        .setTitle('🥳 Obrigado pelo seu Voto!')
        .setDescription(`\`${user.tag}\` votou em mim! Vote você também e seja uma pessoa incrível!\nhttps://zuraaa.com/bots/719524114536333342/votar`)
        .setColor(config.color)
        webvotos.send(voted)
        });
    });
