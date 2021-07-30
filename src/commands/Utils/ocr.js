module.exports = class AvatarCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'ocr',
        categoria: '🪓 • Util',
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

  async run (ctx) {
    if (!ctx.args[0] && !ctx.message.attachments.length) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ocr.n}`)
    const { ocr } = require('../../apikeys')
    const { get } = require('axios')

    let imagem
    if (ctx.message.attachments) {
      imagem = ctx.message.attachments[0].url
    } else {
      imagem = ctx.args.join(' ')
    }

    get(`https://api.ocr.space/parse/imageurl?apikey=${ocr}&url=${imagem}`).then(resp => {
      const embed = new global.star.manager.Ebl()
      embed.title(`📰 OCR | ${global.star.user.username}`)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      embed.description(`\`\`\`${resp.data.ParsedResults.map(parse => parse.ParsedText.replace(/`/g, ''))}\`\`\``)
      ctx.send(embed.create)
    }).catch((e) => {
      ctx.send(`:x: ${ctx.message.author.mention}`)
    })
  }
}

// ADG
