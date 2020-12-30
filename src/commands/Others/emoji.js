const Discord = require('discord.js')
const { parse } = require('twemoji-parser')

module.exports.run = async (client, message, args, prefix) => {

   const emoji = args[0];
   if (!emoji) return message.quote("Nenhum emoji foi disponibilizado");

   let custom = Discord.Util.parseEmoji(emoji);

   if (custom.id) {
      const embed = new Discord.MessageEmbed()
         .setDescription(`[Clique aqui](https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}) para baixar o emoji`)
         .setColor("BLUE")
         .setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
      return message.quote(embed);
   } else {
      let parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) return message.quote("Invalid emoji!");
      const embed = new Discord.MessageEmbed()
         .setDescription(`[Clique aqui](${parsed[0].url}) para baixar o emoji`)
         .setColor("BLUE")
         .setImage(parsed[0].url);
      return message.quote(embed);
   }
}
exports.help = {
    name: 'emoji',
    aliases: ['enlarge'],
    category: 'others'
}