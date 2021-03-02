module.exports = class AvatarCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'avatar',
        categoria: '⏰ • Util' ,
        desc: 'Mostra seu avatar ou o avatar de algum usuário.'
      },
      en: {
        nome: 'avatar',
        categoria: '⏰ • Util',
        desc: 'Shows your avatar or a user\'s avatar.'
      },
    aliases: ['photo', 'av', 'picture', 'foto', 'perfil', 'profile'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixo, idioma) {
    const embed = new (require('discord.js')).MessageEmbed()
    try {
    const user = message.mentions.users.first() || (!isNaN(args[0])?await client.users.fetch(String(args[0])):message.author)
    
    embed.setTitle(`${idioma.avatar.from} ${user.tag}`)
  
    embed.setImage(user.displayAvatarURL({size: 4096, dynamic: true, format: 'png'}))
    
    embed.setColor(`GREEN`)
    
    embed.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    
    return message.quote(embed)
    } catch {
      return message.quote(`:x: ${message.author} **|** ${idioma.avatar.unknown}`)
    }
  
}
}

//Davi