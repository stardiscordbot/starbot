module.exports = class AtaCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'ata',
          categoria: '🤣 • Fun',
          desc: 'Descrição'
        },
        en: {
          nome: 'ata',
          categoria: '🤣 • Fun',
          desc: 'Description'
        },
      aliases: ['monicaata', 'mônicaata'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
    message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
            message.channel.startTyping()
      const Canvas = require(`canvas`);
      const canvas = Canvas.createCanvas(300, 300);
      const ctx = canvas.getContext(`2d`);
      const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
      
      const img = user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 })
      const background = await Canvas.loadImage(`${__dirname}/../../../images/ata-meme.png`)
      const avatar = await Canvas.loadImage(img)
      ctx.drawImage(avatar, 100, 0, 200, 250);
      ctx.drawImage(background, 0, 0);
      let raw = canvas.toBuffer()
      const attachment = new (require("discord.js")).MessageAttachment(raw, `ata-${message.author.id}.png`);
      message.quote(message.author, attachment).then(a => {
          m.delete()
          message.channel.stopTyping()
      })
    })
    }
  }
  
  //Nome de quem fez ou ajudou