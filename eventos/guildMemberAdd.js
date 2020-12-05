const {client} = require("../bot.js");
const config = require("../config.json");
const c = require('colors')
const autorole = require('../mongodb/autorole')
const welcomeChannel = require('../mongodb/WelcomeChannel')

client.on('guildMemberAdd', member => {
// Carinha
let guild = await client.guilds.cache.get("714930300924461057");
let channel = await client.channels.cache.get("755277456969302057");
let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
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
  let join = new Discord.MessageEmbed()
  .setTitle(`${member.guild.name}`)
  .setDescription(`Olá ${member.user} seja bem-vindo ao servidor\n Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
  .setColor('#ff00c2')
 welcomechanneldata.send(join)
    })
    // Autorole
    autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
        if(!data432) return;
        let autorolerole = member.guild.roles.cache.get(data432.RoleID)
        member.roles.add(autorolerole)
      })
    // Fim
})