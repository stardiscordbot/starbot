const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
    var embed = new Discord.MessageEmbed()       
          .setTitle(`Upvote | ${client.user.username}`)
          .addField("Zuraaa:", "[Clique Aqui!](https://botsparadiscord.com/bots/719524114536333342/votar)")
          .addField("Top.GG ", "[Clique Aqui!](https://top.gg/bot/719524114536333342/vote)")
          .setColor(`PURPLE`)
          .setFooter('© Star 2020', client.user.displayAvatarURL());
    message.quote(embed)
}

module.exports.help = {
    name: "upvote",
    aliases: ['votar'],
    category: 'others'
}