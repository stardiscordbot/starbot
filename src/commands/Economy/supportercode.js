module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'support',
        categoria: '💸 • Economia',
        desc: 'Pega seu bonûs diário'
      },
      en: {
        nome: 'support',
        categoria: '💸 • Economy',
        desc: 'Take you daily bonûs'
      },
      aliases: ['codigo-de-apoiados', 'codigodeapoiador', 'supportercode', 'starpartner'],
      run: this.run
    }
  }

  async run (ctx) {
    let code = await global.db.get(`code-${ctx.message.author.id}`)
    if (!code) {
      const code2 = Math.random().toString(36).slice(2, 10)
      code = code2
      await global.db.set(`code-${ctx.message.author.id}`, code2.toUpperCase())
      await global.db.set(`uses-${ctx.message.author.id}`, 0)
      await global.db.set(code2.toUpperCase(), ctx.message.author.id)
    }
    const uses = await global.db.get(`uses-${ctx.message.author.id}`) || 0
    const embed = new global.star.manager.Ebl()
    embed.title(`📩 RefCode | ${global.star.user.username}`)
    embed.description(ctx.idioma.sup.inf)
    embed.field(`📩 ${ctx.idioma.sup.code}`, `<:st_music_aviso:830833205363736587> **__${code.toUpperCase()}__**\n**${ctx.idioma.sup.use}** ${uses}`)
    embed.color('#dd3af0')
    embed.thumbnail(global.star.user.avatarURL)
    ctx.send(embed.create)
  }
}
