module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'laranjo',
          categoria: '(Emoji) Testes',
          desc: 'Cria um meme do laranjo'
        },
        en: {
          nome: 'laranjo',
          categoria: '(Emoji) Testing',
          desc: 'Create a laranjo meme'
        },
      aliases: ['example'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      
        const { createCanvas, loadImage } = require('canvas');
        if((args.join(" ").length) > 300) return message.quote(idioma.image.long.replace("%u", message.author))
  
        if(!args[0]) return message.quote(`${idioma.image.args.replace("%u", message.author)}`)

        message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {

            const canvas = createCanvas(685, 494); 
            const ctx = canvas.getContext('2d');
            
            const background = await loadImage('https://media.discordapp.net/attachments/510871777728135201/777618213331796029/laranjo-meme-star.jpg?width=627&height=452');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#000';
            ctx.fillText(`${args.join(" ")}`.match(/.{1,50}/g).join("\n"), canvas.width / 50.9, canvas.height / 15.9, 655);
            
            const attachment = new (require("discord.js")).MessageAttachment(canvas.toBuffer(), 'laranjo.png');
         
            await message.quote(`${message.author}`, attachment).then(m2 => {
                m.delete()
                })
        })

    }
  }
  
  //Nome de quem fez ou ajudou