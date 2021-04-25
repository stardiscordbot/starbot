module.exports = class AvatarCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'ocr',
          categoria: '🪓 • Util' ,
          desc: 'Tire o texto de uma imagem.'
        },
        en: {
          nome: 'ocr',
          categoria: '🪓 • Util',
          desc: 'Take the text out of an image.'
        },
      aliases: ['ler'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const keys = require("../../config/json/keys.json")
        const at = message.attachments.first()
        const fetch = require("node-fetch")
        const imagem = {}
        if (message.attachments.size == 0 && !args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.ocr.n}`)
        if(at) {
          imagem.url = at.url
        } else {
          imagem.url = args[0]
        }
        message.quote(`🔍 ${message.author} **|** ${idioma.ocr.read}`).then(async mm => {
          const res = await fetch(`https://api.ocr.space/parse/imageurl?apikey=${keys.ocr}&url=${imagem.url}`).then(res => res.json())
          .then(json => {
          message.channel.startTyping()
        const o = json.ParsedResults.map(parse => parse.ParsedText.replace(/`/g, ''))
        const ocembed = new (require("discord.js")).MessageEmbed()
        .setTitle("📰 OCR")
        .setColor("BLUE")
        .setDescription(`\`\`\`\n${o}\n\`\`\``)

        message.quote(message.author, ocembed).then(m => {
          message.channel.stopTyping()
          mm.delete()
          })
        })
      })
  }
  }
  
  //ADG