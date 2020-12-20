const Discord = require("discord.js") 

module.exports.run = async (client, message, args, prefix) => { 
this.emoji = args[0]
if(!this.emoji) return message.quote("coloque um emoji")
const emoji = client.emojis.cache.filter(c => c.name === this.emoji || c.name.toLowerCase() === this.emoji)
if(!emoji) return message.quote("este emoji não existe")
message.quote(emoji.map(c => c).join("\n")).then(async msg =>{
emoji.map(async c => await msg.react(c.identifier))
  
 
let Diversão = (reaction, user) => reaction.emoji.identifier === emoji.map(c => c.identifier) && user.id === message.author.id;  

const coletorDiversão = msg.createReactionCollector(Diversão, {time: 60000});

coletorDiversão.on("collect", async r => {
message.quote("a")
    })
  })
}
exports.help = {
  name: 'findemoji',
  aliases: ['searchemoji'],
  status: 'on'
}