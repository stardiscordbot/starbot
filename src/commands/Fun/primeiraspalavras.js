module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'primeiraspalavras',
          categoria: '🤣 • Fun',
          desc: 'Ai meu deus... as primeiras palavras do bebê'
        },
        en: {
          nome: 'firstwords',
          categoria: '🤣 • Fun',
          desc: 'Oh my god... the baby\'s first words!'
        },
      aliases: ['primeiraspalavras', 'firstword', 'firstwords', 'primeiraspalavras', 'bebe'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      
        const { createCanvas, loadImage } = require('canvas');
        if((args.join(" ").length) > 300) return message.quote(idioma.image.long.replace("%u", message.author))
  
        if(!args[0]) return message.quote(`${idioma.image.args.replace("%u", message.author)}`)

        message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
          message.channel.startTyping()
          let baby = `${args.join(" ").slice(0, 1)}.. ${args.join(" ").slice(0, 2)}...`;
        
          const canvas = createCanvas(485, 450); 
          const ctx = canvas.getContext('2d');

          const background = await loadImage('https://i.imgur.com/T9CQliT.png');
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          ctx.font = '30px sans-serif';
          ctx.fillStyle = '#000';
          ctx.fillText(baby, canvas.width / 50.9, canvas.height / 16.5);

          ctx.font = '30px sans-serif';
          ctx.fillStyle = '#000';
          ctx.fillText(args.join(" ").match(/.{1,20}/g).join("\n"), canvas.width / 50.9, canvas.height / 1.7, 330)
          const attachment = new (require("discord.js")).MessageAttachment(canvas.toBuffer(), `fw-${message.author.id}.png`);
         
            await message.quote(`${message.author}`, attachment).then(m2 => {
                message.channel.stopTyping()
                m.delete()
                })
        })

    }
  }
  
  //Nome de quem fez ou ajudou
  //https://i.imgur.com/M2v1sr6.png