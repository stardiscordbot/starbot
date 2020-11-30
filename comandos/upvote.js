const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
    var embed = new Discord.MessageEmbed()
        	.setTitle(" • Votos!")        
          .addField("❓ FAQ Votos:", ("Você pode Me Ajudar a Crescer Votando!"))
          .addField(" Bots para Discord:", "[Clique Aqui!](https://botsparadiscord.com/bots/719524114536333342/votar)")
          .addField(" Top.GG ", "[Clique Aqui!](https://top.gg/bot/719524114536333342/vote)")
          .setColor(`PURPLE`)
          .setFooter('© Star 2020', client.user.displayAvatarURL());
    message.channel.send(embed)
}

module.exports.help = {
    name: "upvote",
    aliases: ['votar']
}