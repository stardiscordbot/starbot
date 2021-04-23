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

        if(!args[0]) return message.quote(`cade a imagem? nn sei`)

        const ocrSpace = require('ocr-space-api-wrapper')

        const res = await ocrSpace(`${args[0]}`, { apiKey: keys.ocr });
        const jai = await JSON.stringify(res)

        const o = res.ParsedResults.map(parse => parse.ParsedText)

        message.quote(`\`\`\`\n${o}\n\`\`\``)
  }
  }
  
  //Davi
  