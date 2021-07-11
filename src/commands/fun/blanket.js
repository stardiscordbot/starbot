module.exports = class BlanketCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'blanket',
        categoria: '🤣 • Fun',
        desc: 'Descrição'
      },
      en: {
        nome: 'blanket',
        categoria: '🤣 • Fun',
        desc: 'Description'
      },
      aliases: ['mimir', 'coberta', 'cobertor', 'amimir', 'sono'],
      run: this.run
    }
  }

  async run (ctx) {
    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(590, 590)
    const foto = canvas.getContext('2d')
    const user = ctx.args[0] ? ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0]).catch(_ => ctx.ctx.message.author.mention) : ctx.message.author

    const background = await loadImage('./assets/blanket.png')
    const avatar = await loadImage(user.avatarURL)
    const redondo = await loadImage('./assets/mask.png')

    foto.drawImage(avatar, 210, 40, 300, 330)
    foto.drawImage(redondo, 210, 40, 300, 330)
    foto.drawImage(background, 0, 0)

    ctx.message.channel.createMessage(ctx.message.author.mention, {
      file: canvas.toBuffer(),
      name: 'mcconquista.png'
    })
  }
}

// Nome de quem fez ou ajudou
