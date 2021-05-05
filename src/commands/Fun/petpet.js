module.exports = class VarporwaveCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'petpet',
          categoria: '🤣 • Fun',
          desc: 'Cria uma mensagem com ａｅｓｔｈｅｔｉｃｓ	'
        },
        en: {
          nome: 'petpet',
          categoria: '🤣 • Fun',
          desc: 'Create a message with ａｅｓｔｈｅｔｉｃｓ'
        },
      aliases: ['pet', 'petgif', 'petpet', 'petpat'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
            message.channel.startTyping()

        const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
        const av = user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 })

        const petPetGif = require('pet-pet-gif')
        let animatedGif = await petPetGif(av)
        const attachment = new (require("discord.js")).MessageAttachment(animatedGif, `petpet-${message.author.id}.gif`);
        message.quote(message.author, attachment).then(a => {
            m.delete()
            message.channel.stopTyping()
        })
    })
    }
  }
  
  //ADG