module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'undertalebox',
        categoria: '😄 • Diversão',
        desc: 'Cria uma caixa de diálogo igual ao do Undertale'
      },
      en: {
        nome: 'undertalebox',
        categoria: '😄 • Fun',
        desc: 'Creates a dialog just like Undertale'
      },
      aliases: ['utbox'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`${ctx.idioma.image.args.replace('%u', ctx.message.author.mention)}`)
    if ((ctx.args.join(' ').length) > 300) return ctx.send(`${ctx.idioma.image.long.replace('%u', ctx.message.author.mention)}`)
    const { createCanvas, loadImage, registerFont } = require('canvas')
    const { greyscale } = require('../../Helpers/Canvas')

    registerFont('./assets/Minecraftia.ttf', { family: 'Minecraft' })
    const base = await loadImage('./assets/undertalebox.png')
    const avatar = await loadImage(ctx.message.author.avatarURL)
    const canvas = createCanvas(base.width, base.height)
    const foto = canvas.getContext('2d')
    const text = ctx.args.join(' ')
    foto.drawImage(base, 0, 0)
    foto.font = '17px Minecraftia'
    foto.drawImage(avatar, 15, 15, 120, 120)
    foto.fillStyle = '#ffffff'
    foto.fillText(`${text}`.match(/.{1,35}/g).join('\n'), canvas.width / 3.4, canvas.height / 2.7, 655)
    greyscale(foto, 0, 0, base.width, base.height)
    ctx.message.channel.createMessage(ctx.message.author.mention, {
      file: canvas.toBuffer(),
      name: 'undertalebox.png'
    })
  }
}
