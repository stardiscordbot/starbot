const {client} = require("../../bot.js");
const {star} = require("../../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
const fs = require('fs')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const logChannel = require('../mongodb/messagelog.js');
const economy = require("../mongodb/economy.js");
const antilink = require('../mongodb/antilink');
const { exec } = require("child_process")
// Inicio do Code
client.on("ready", () => {
    require('../utils/ZuraaaVotos.js')
    require('../../StarPlayer.js')
    let activities = [
        `Utilize ${config.prefix}ajuda para ver meus comandos ^^`,
        `Amor para todo o mundo ❤️!`,
        `Alegria para todos os meus usuários`,
        `Utilize ${config.prefix}ajuda para votar em mim!`,
        `Entre em meu servidor de suporte! https://discord.gg/2pFH6Yy`
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
       type: "STREAMING", url: "https://www.twitch.tv/adg_ofc"
        }), 30000);
    client.user
          .setStatus("online")
          .catch(console.error);
    console.log(c.brightGreen(`[LOGIN] - Estou Online!\n[BOT] - ${client.user.username}\n[SERVIDORES] - ${client.guilds.cache.size}`))
    client.channels.cache.get('798292414686822411').setName(`▏📝Servidores: ${client.guilds.cache.size}`)
    const readyembed = new Discord.MessageEmbed()
    .setTitle('Star™ | Status')
    .setDescription(`**[LOGIN] - Estou Online!\n[BOT] - ${client.user.username}\n[SERVIDORES] - ${client.guilds.cache.size}**`)
    .setColor('00ff08')
    star.send(readyembed)
});
