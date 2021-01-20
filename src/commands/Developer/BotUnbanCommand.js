const Discord = require("discord.js");
const config = require('../../config.json');
const emoji = require('../../jsons/emojis.json')
const db = require("../../mongodb/blacklist.js");
const mod = require('../../mongodb/modperm.js')

exports.run = async (client, message, args, prefix) => {
  mod.findOne({_id:message.author.id}, async (err, moddb) => {
    if(!moddb) {
        message.quote(`${emoji.nao} ${message.author}, apenas moderadores do bot podem usar este comando`)
      }
    if(moddb) {
  const id = args[0]
  if(!id) return message.quote(`${emoji.nao} ${message.author}, Você precisa adicionar o ID do usuário`)
    if(isNaN(id)) return message.quote(`${emoji.nao} ${message.author}, Você sabia que o ID do usuário é somente números? Então por que colocou: **"${id}"**?`)
      if(id.length < 18 || id.length > 18) return message.quote(`${emoji.nao} ${message.author}, Um ID contém 18 caracteres.`)
      const user = await client.users.fetch(id)
    db.findOneAndDelete({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Blacklist | Sucesso")
        .setColor("00ff08")
        .setDescription(`${emoji.sim} **O usuário \`${user.tag}\` foi desbanido**`)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(dd);
      } else {
        const erro = new Discord.MessageEmbed()
        .setTitle("BlackList | Erro")
        .setColor("ff0000")
        .setDescription(`${emoji.nao} **O usuário ${user.tag} não está banido**`)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(erro)
        }
      })
    }
  })
}
exports.help = {
    name: 'rbl',
    aliases: ['starunban', 'botunban', 'bub'],
    category: 'dev'
}