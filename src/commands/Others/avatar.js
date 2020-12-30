const Discord = require('discord.js')
const config = require('../../config.json')

module.exports.run = async (client, message, args, prefix) => {

    const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
    const avatar = user.displayAvatarURL({ dynamic: true, size: 2048 })
    
    const eu = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, avatar)
      .setDescription(`<:db_download:782290025458696192> __[Clique Aqui](${avatar})__ para Baixar o Avatar\n*Eu sei que sou linda, infelizmente já tenho dono :)*`)
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

      if(user.id === client.user.id) return message.quote(eu)

      const adg = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, avatar)
      .setDescription(`<:db_download:782290025458696192> __[Clique Aqui](${avatar})__ para Baixar o Avatar\n*<:botdeveloper:763739544549326899> Você sabia que o ADG é meu criador? <:botdeveloper:763739544549326899>*`)
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

      if(user.id === '717766639260532826') return message.quote(adg)

      const gustavo = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, avatar)
      .setDescription(`<:db_download:782290025458696192> __[Clique Aqui](${avatar})__ para Baixar o Avatar\n*<:botdeveloper:763739544549326899> Você sabia que o Gustavo é um dos admininstradores do projeto? <:botdeveloper:763739544549326899>*`)
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

      if(user.id === '664174201220890645') return message.quote(gustavo)
      
      const welling = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, avatar)
      .setDescription(`<:db_download:782290025458696192> __[Clique Aqui](${avatar})__ para Baixar o Avatar\n*<:botdeveloper:763739544549326899> Você sabia que o Welling é um dos meus devs? <:botdeveloper:763739544549326899>*`)
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

      if(user.id === '422535241211707393') return message.quote(welling)

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, avatar)
      .setDescription(`<:db_download:782290025458696192> __[Clique Aqui](${avatar})__ para Baixar o Avatar`)
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.quote(embed)
    }
exports.help = {
    name: 'avatar',
    aliases: ['av'],
    status: 'on'
}