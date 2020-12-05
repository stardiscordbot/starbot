const Discord = require("discord.js");   
const config = require('../config.json');
const pr = require('../mongodb/prefix.js');
const Guild = require('../mongodb/guild.js');

exports.run = async (client, message, args) => {
    // Custo Prefix
  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    const embed = new Discord.MessageEmbed()
    .addField(`${client.commands.filter(command => client.commands.help.category === "adg").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")}`)
    message.quote(embed)
})
}
exports.help = { 
  name: 'teste', 
  aliases: ['aliases'],
  status: 'on'
}