module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'firstwords',
        categoria: '🤣 • Fun',
        desc: 'Ai meu deus... as primeiras palavras do bebê'
      },
      en: {
        nome: 'firstwords',
        categoria: '🤣 • Fun',
        desc: 'Oh my god... the baby\'s first words!'
      },
      aliases: ['firstword', 'bebe', 'primeiraspalavras'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`${ctx.idioma.image.args.replace('%u', ctx.message.author.mention)}`)
    if ((ctx.args.join(' ').length) > 300) return ctx.send(`${ctx.idioma.image.long.replace('%u', ctx.message.author.mention)}`)
    const { createCanvas, loadImage } = require('canvas')
    const baby = `${ctx.args.join(' ').slice(0, 1)}.. ${ctx.args.join(' ').slice(0, 2)}...`

    const canvas = createCanvas(485, 450)
    const foto = canvas.getContext('2d')

    const background = await loadImage('./assets/firstword.png')
    foto.drawImage(background, 0, 0, canvas.width, canvas.height)

    foto.font = '30px sans-serif'
    foto.fillStyle = '#000'
    foto.fillText(baby, canvas.width / 50.9, canvas.height / 16.5)

    foto.font = '30px sans-serif'
    foto.fillStyle = '#000'
    foto.fillText(ctx.args.join(' ').match(/.{1,20}/g).join('\n'), canvas.width / 50.9, canvas.height / 1.7, 330)

    ctx.message.channel.createMessage(ctx.message.author.mention, {
      file: canvas.toBuffer(),
      name: 'firstwords.png'
    })
  }
}

// ADG, Davi e LRD
