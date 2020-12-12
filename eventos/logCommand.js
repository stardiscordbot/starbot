const {client} = require("../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const votosZuraaa = require('../votosZuraaa.js');
const logChannel = require('../mongodb/messagelog.js');
const Money = require("../mongodb/money.js");
const antilink = require('../mongodb/antilink');
// Inicio do Code
const comando = new Discord.WebhookClient(config.logID, config.logToken)
 client.on('message', async message => {
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
   const dono = await client.users.fetch(message.guild.ownerID)
   pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
            let embeddiretor = new Discord.MessageEmbed()
                .setTitle("🔔 • Log de comandos!")
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Usuário:** \`${message.author.tag}\` \n **ID:** \`${message.author.id}\` \n **Comando:** \`${message.content}\` \n**URL:** [Clique Aqui](${message.url}) \n\n **🔍 • Dados do servidor!**\n \n **Nome:** \`${message.guild.name}\` \n **ID:** \`${message.guild.id}\` \n**Posse:** \`${dono.tag}\`\n**OwnerID:** \`${message.guild.ownerID}\`\n**Membros:** \`${message.guild.memberCount}\` \n **Canais:** \`${message.guild.channels.cache.size}\``)
                comando.send(embeddiretor);
    console.log(c.brightMagenta(`-----------------------LOG-----------------------\n[LOG DE COMANDOS]\nUsuário: ${message.author.tag}\nID: ${message.author.id}\nComando: ${message.content}\n\n[DADOS SERVIDOR]\nNome: ${message.guild.name}\nID: ${message.guild.id}\nPosse: ${dono.tag}\nOwnerID: ${message.guild.ownerID}\nMembros: ${message.guild.memberCount}\nCanais: ${message.guild.channels.cache.size}\n-----------------------LOG-----------------------`))
            });
          })