const Discord = require("discord.js");   
const config = require('../config.json');
const pr = require('../mongodb/prefix.js');
const Guild = require('../mongodb/guild.js');

exports.run = async (client, message, args, prefix) => {
    // Coisas de Exemplo
    const comando = 'NOME DO COMANDO'
    const aliases = 'ALIASES DO COMANDO'
    const exemplo = 'EXEMPLO DE ULTILIZAÇÃO'
    const exemploFoto = 'EXEMPLO DE ULTILIZAÇÃO FOTO'
    const permissão = 'PERMISSÃO DO COMANDO'
    // Custo Prefix
  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    // Embed de Exemplo
  const exemploembed = new Discord.MessageEmbed()
  .setTitle(`${client.user.username} | ${comando}`)
  .addField(`🔨 Ultilização:`,`\`${prefix}${comando}\``)
  .addField(`📖 Exemplo:`, `\`${prefix}${comando} ${exemplo}\``)
  .addField(`📛 Permissões:`. `\`${permissão}\``)
  .addField(`🔀 Aliases:`, `\`${aliases}`)
  .setColor(config.color)
  .setImage(`${exemploFoto}`)
  if(args[0]) {
      message.channel.send(exemploembed)
  }
// Código Aqui

  })
}
exports.help = { 
  name: 'comando', 
  aliases: ['aliases'],
  status: 'on'
}