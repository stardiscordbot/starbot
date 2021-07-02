module.exports = class EnfimCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'fisheye',
        categoria: '🤣 • Fun',
        desc: 'Enfim a hipocrisia'
      },
      en: {
        nome: 'fisheye',
        categoria: '🤣 • Fun',
        desc: 'Finally the hypocrisy'
      },
      aliases: ['olhodepeixe', 'feye'],
      run: this.run
    }
  }

  async run (ctx) {
    const { createCanvas, loadImage } = require('canvas')
    const { fishEye } = require('../../Helpers/Canvas')

    const user = ctx.args[0] ? ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0]).catch(_ => ctx.ctx.message.author.mention) : ctx.message.author
    const background = await loadImage(user.avatarURL)
    const canvas = createCanvas(background.width, background.height)
    const foto = canvas.getContext('2d')

    foto.drawImage(background, 0, 0, canvas.width, canvas.height)
    const avatar = await loadImage(user.avatarURL)
    foto.drawImage(avatar, 50, 100, 150, 150)
    fishEye(foto, 3, 0, 0, background.width, background.height)
    ctx.message.channel.createMessage(ctx.message.author.mention, {
      file: canvas.toBuffer(),
      name: 'fisheye.png'
    })
  }
}
