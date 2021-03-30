module.exports = class VarporwaveCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'delete',
        categoria: '🤣 • Fun',
        desc: 'Cria uma imagem lgbt de algum user'
      },
      en: {
        nome: 'delete',
        categoria: '🤣 • Fun',
        desc: 'Creates a lgbt image of a user'
      },
    aliases: ['windowstrash'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {
    
    const DIG = require("discord-image-generation");

    const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author

    const av = user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 })

    message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
      message.channel.startTyping()
    const img = await new DIG.Delete().getImage(av)
        
    const attachment = new (require('discord.js')).MessageAttachment(img, `delete-${user.id}.png`);

      message.quote(message.author,attachment).then(message => {
        message.channel.stopTyping()
        msg.delete()
      })
      
    })

  }
}

//ADG