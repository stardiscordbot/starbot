module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'print',
        categoria: '💻 • Desenvolvedor',
        desc: 'Tira print de um site'
      },
      en: {
        nome: 'print',
        categoria: '💻 • Developer',
        desc: 'Take a print of a website'
      },
      aliases: ['foto', 'site', 'website'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Faltou o site af`)
    const foto = `https://image.thum.io/get/maxAge/12/width/700/crop/900/${ctx.args.join(' ')}`
    const embed = new global.star.manager.Ebl()
    embed.image(foto)
    embed.color('#dd3af0')
    ctx.send(embed.create)
  }
}
