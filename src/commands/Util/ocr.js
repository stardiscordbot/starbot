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
        const imagem = {}

        if (message.attachments.size == 0 && !args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.ocr.n}`)

        if(at) {
          imagem.url = at.url
        } else {
          imagem.url = args[0]
        }
        //if(args[0]) return imagem.url = args[0]

        //const firstAttachment = message.attachments.first()

        message.quote(`🔍 ${message.author} **|** ${idioma.ocr.read}`).then(async mm => {
          message.channel.startTyping()
        const ocrSpace = require('ocr-space-api-wrapper')
        const res = await ocrSpace(`${imagem.url}`, { apiKey: keys.ocr });
        const o = res.ParsedResults.map(parse => parse.ParsedText.replace(/`/g, ''))
        const ocembed = new (require("discord.js")).MessageEmbed()
        .setTitle("📰 OCR")
        .setDescription(`\`\`\`\n${o}\n\`\`\``)

        message.quote(message.author, ocembed).then(m => {
          message.channel.stopTyping()
          mm.delete()
        })
      })
  }
  }
  
  //ADG