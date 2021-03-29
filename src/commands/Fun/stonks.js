const jimp = require("jimp")

module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'stonks',
          categoria: '🤣 • Fun',
          desc: 'Faça um meme stonks !!!'
        },
        en: {
          nome: 'stonks',
          categoria: '🤣 • Fun',
          desc: 'Make a meme stonks !!!'
        },
      aliases: [],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

        let img = jimp.read("https://media.discordapp.net/attachments/723135289320538152/733670552622989352/stonks-meme.png")
        if (!args[0]) return message.reply(idioma.cmm.text)
        if(args[0].length > 50) {
            return message.reply(idioma.stonks.limit)
            }
        message.quote(idioma.image.editando.replace('%u', message.author)).then(msg => {
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(font => {
                image.resize(685, 500)
                image.print(font, 20, 30, args.join(" "), 700)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "stonks.png"}]}).then(m => {
                        })
                    })
                })
            })
        })
    }
}