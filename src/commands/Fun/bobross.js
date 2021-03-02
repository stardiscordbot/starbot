module.exports = class BobrossCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'bobross',
        categoria: '🤣 • Fun',
        desc: 'Cria uma pintura estilo "bobross"'
      },
      en: {
        nome: 'bobross',
        categoria: '🤣 • Fun',
        desc: 'Creates a "bobross" style painting'
      },
    aliases: ['picture', 'art', 'quadro'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {
    
    const DIG = require("discord-image-generation");

    const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author

    const av = user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 })

    message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {

    const img = await new DIG.Bobross().getImage(av)
        
    const attachment = new (require('discord.js')).MessageAttachment(img, `moldura-${user.id}.png`);

      message.quote(message.author,attachment).then(message => {
        msg.delete()
      })
      
    })

  }
}

//ADG