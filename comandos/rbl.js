const Discord = require("discord.js");
const config = require('../config.json')
const db = require("../mongodb/blacklist.js");

exports.run = (client, message, args, prefix) => {
    if (!['422535241211707393', '717766639260532826' , '742798447253651506', '485922669208797226'].some(a => message.author.id === a)) return message.quote('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')
  const id = args[0]
  const user = client.users.cache.find(a => a.id === id)
  if(!id) return message.quote("Você precisa adicionar o ID do usuário")
    if(isNaN(id)) return message.quote(`Você sabia que o ID do usuário é somente números? Então por que colocou: "${id}"?`)
      if(id.length < 18 || id.length > 18) return message.quote("Um ID contém 18 caracteres.")
    db.findOneAndDelete({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Blacklist | Sucesso")
        .setColor("GREEN")
        .setDescription("O usuário foi removido da blacklist")
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(dd);
      } else {

        const erro = new Discord.MessageEmbed()
        .setTitle("BlackList | erro")
        .setColor("RED")
        .setDescription(`O usuário não está na Blacklist para ser removido`)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(erro)
      }
    })
}
exports.help = {
    name: 'rbl',
    aliases: ['starunban', 'botunban', 'bub'],
    category: 'dev'
}