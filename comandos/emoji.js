const Discord = require('discord.js')
const { parse } = require('twemoji-parser')

module.exports.run = async (client, message, args) => {

   const emoji = args[0];
   if (!emoji) return message.channel.send("Nenhum emoji foi disponibilizado");

   let custom = Discord.Util.parseEmoji(emoji);

   if (custom.id) {
      const embed = new Discord.MessageEmbed()
         .setDescription(`[Clique aqui](https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}) para baixar o emoji`)
         .setColor("BLUE")
         .setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
      return message.channel.send(embed);
   } else {
      let parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) return message.channel.send("Invalid emoji!");
      const embed = new Discord.MessageEmbed()
         .setDescription(`[Clique aqui](${parsed[0].url}) para baixar o emoji`)
         .setColor("BLUE")
         .setImage(parsed[0].url);
      return message.channel.send(embed);
   }
}
exports.help = {
    name: 'emoji',
    aliases: ['enlarge']
}