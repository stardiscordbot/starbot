module.exports = class EnfimCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'enfim',
        categoria: '🤣 • Fun',
        desc: 'Enfim a hipocrisia'
      },
      en: {
        nome: 'enfim',
        categoria: '🤣 • Fun',
        desc: 'Finally the hypocrisy'
      },
      aliases: ['fim', 'hypocrisy', 'hipocrisia'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`${ctx.idioma.image.args.replace('%u', ctx.message.author.mention)}`)
    if ((ctx.args.join(' ').length) > 300) return ctx.send(`${ctx.idioma.image.long.replace('%u', ctx.message.author.mention)}`)
    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(685, 494)
    const foto = canvas.getContext('2d')

    const background = await loadImage('./assets/enfim.jpg')
    foto.drawImage(background, 0, 0, canvas.width, canvas.height)

    foto.font = '30px sans-serif'
    foto.fillStyle = '#FFFFFF'
    foto.fillText(`${ctx.args.join(' ')}`.match(/.{1,50}/g).join('\n'), canvas.width / 50.9, canvas.height / 15.9, 655)

    ctx.message.channel.createMessage(ctx.message.author.mention, {
      file: canvas.toBuffer(),
      name: 'enfim.png'
    })
  }
}
