const Discord = require("discord.js") 

module.exports.run = async (client, message, args) => { 
this.emoji = args[0]
if(!this.emoji) return message.channel.send("coloque um emoji")
const emoji = client.emojis.cache.filter(c => c.name === this.emoji || c.name.toLowerCase() === this.emoji)
if(!emoji) return message.channel.send("este emoji não existe")
message.channel.send(emoji.map(c => c).join("\n")).then(async msg =>{
emoji.map(async c => await msg.react(c.identifier))
  
 
let Diversão = (reaction, user) => reaction.emoji.identifier === emoji.map(c => c.identifier) && user.id === message.author.id;  

const coletorDiversão = msg.createReactionCollector(Diversão, {time: 60000});

coletorDiversão.on("collect", async r => {
message.channel.send("a")
    })
  })
}
exports.help = {
  name: 'findemoji',
  aliases: ['searchemoji'],
  status: 'on'
}