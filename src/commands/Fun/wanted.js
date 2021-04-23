module.exports = class WantedCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'procurado',
        categoria: '🤣 • Fun',
        desc: 'Cria uma imagem lgbt de algum user'
      },
      en: {
        nome: 'wanted',
        categoria: '🤣 • Fun',
        desc: 'Creates a lgbt image of a user'
      },
    aliases: ['procurado', 'ladrão'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {
    
    const DIG = require("discord-image-generation");

    const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author

    const av = user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 })

    message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
      message.channel.startTyping()
    const img = await new DIG.Wanted().getImage(av)
        
    const attachment = new (require('discord.js')).MessageAttachment(img, `wanted-${user.id}.png`);

      message.quote(message.author,attachment).then(mai => {
        message.channel.stopTyping()
        msg.delete()
      })
      
    })

  }
}

//ADG