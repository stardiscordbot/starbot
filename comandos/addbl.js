const Discord = require("discord.js");
const config = require('../config.json')
const db = require("../mongodb/blacklist.js");

module.exports.run = async (client, message, args, prefix) => {
    if (!config.dev.some(a => message.author.id === a)) return message.quote('Apenas desenvolvedores / moderadores do bot podem utilizar este comando!')
  const id = args[0]
  const user = await client.users.fetch(id)
  const motivo = args.splice(1).join(" ")
  if(!id) return message.quote("Você precisa adicionar o ID do usuário")
  if(isNaN(id)) return message.quote(`Você sabia que o ID do usuário é somente números? Então por que colocou: "${id}"?`)
      if(id.length < 18 || id.length > 18) return message.quote("Um ID contém 18 caracteres.")
  if(id == "422535241211707393" || id == "717766639260532826" || id == "672652538880720896") return message.quote(`Desculpe ${message.author.tag}, mas você sabe com certeza que ${user.tag} é um dos meus desenvolvedores, então por que eu iria bloquear ele?`)
    db.findOne({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Blacklist | Erro")
        .setColor("ff0000")
        .setDescription(`**O Usuário \`${user.tag}\` já está banido**`)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(dd);
      } else {
        new db ({
          _id:id,
          autorTag:message.author.tag,
          motivo:motivo
        }).save().catch(err => console.log(err))
        const sucesso = new Discord.MessageEmbed()
        .setTitle("BlackList | Sucesso")
        .setColor("00ff08")
        .setDescription(`**O Usuário \`${user.tag}\` foi banido**`)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(sucesso)
      }
    })
};
exports.help = {
    name: 'addbl',
    aliases: ['starban', 'botban', 'bb', 'blockuser', 'ignoreuser'],
    status: 'on',
    category: 'dev'
}