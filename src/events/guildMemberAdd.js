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
const logChannel = require('../mongodb/messagelog.js');
const Money = require("../mongodb/money.js");
const antilink = require('../mongodb/antilink');
// Inicio do Code
const logdewelcome = new Discord.WebhookClient(config.logID, config.logToken)
client.on('guildMemberAdd', async member => {
// Carinha
let guild = await client.guilds.cache.get("714930300924461057");
let channel = await client.channels.cache.get("755277456969302057");
let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
if(!channel) return console.log('[CANAL] - Canal de boas-vindas inexistente :)'.america)
if (guild != member.guild) {
  return
 } else {
  channel.send(`<a:welcome:755429019230404618>  Olá ${member.user} Bem-Vindo(a) a **${guild.name}** Passa em <#755277453408337981> para obter tags <a:hypegato:755445409157218484>`).then(msg=> {
  msg.delete({ timeout: 30000 });
  })
}
// Welcome
    welcomeChannel.findOne({ GuildID: member.guild.id }, async (err, data) => {
      if(!data) return;
let welcomechanneldata = client.channels.cache.get(data.WelcomeChannelID)
if(!welcomechanneldata) return console.log('[CANAL] - Canal de boas-vindas inexistente :)'.america)
  let join = new Discord.MessageEmbed()
  .setTitle(`${member.guild.name}`)
  .setDescription(`Olá ${member.user} seja bem-vindo ao servidor\n Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
  .setColor('#ff00c2')
  let welcomelog = new Discord.MessageEmbed()
  .setTitle(`${member.guild.name}`)
  .setColor('ff00c2')
  .setDescription(`Enviei a Mensagem de boas vindas no servidor ${member.guild.name}\nEnviei a Mensagem de boas vindas no canal <#${data.WelcomeChannelID}>`)
  log.send(welcomelog)
 welcomechanneldata.send(join)
    })
    // Autorole
    autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
        if(!data432) return;
        let autorolerole = member.guild.roles.cache.get(data432.RoleID)
        if(!autorolerole) return console.log('[ROLE] - Canal de boas-vindas inexistente :)'.america)
        let autorolelog = new Discord.MessageEmbed()
        .setTitle(`${member.guild.name}`)
        .setColor('ff00c2')
        .setDescription(`Adicionei o cargo <@&${data432.RoleID}> ao usuário ${member.user} no servidor ${member.guild.name}`)
        member.roles.add(autorolerole)
      })
    // Fim
})