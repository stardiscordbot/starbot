module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'daily',
        categoria: '💸 • Economia',
        desc: 'Pega seu bonûs diário'
      },
      en: {
        nome: 'daily',
        categoria: '💸 • Economy',
        desc: 'Take you daily bonûs'
      },
      aliases: ['diario', 'dd'],
      run: this.run
    }
  }

  async run (ctx) {
    const timeout = Number(86400000)
    const moment = require('moment')
    const daily = Number(Math.floor(Math.random() * 6500) + 1000) // Minimo 1000, Máximo 7500
    const dailytime = await global.db.get(`dailytime-${ctx.message.author.id}`)

    if (!dailytime) {
      await global.db.set(`money-${ctx.message.author.id}`, Number(daily))
      await global.db.set(`dailytime-${ctx.message.author.id}`, Number(Date.now()))

      const embed = new global.star.manager.Ebl()
      embed.title(`💸 Daily | ${global.star.user.username}`)
      embed.description(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace('%m', Number(daily))}`)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)

      ctx.send(embed.create)
    } else {
      if (dailytime != null && timeout - (Date.now() - dailytime) > 0) {
        const tt = moment(timeout - (Date.now() - dailytime)).format('HH:mm:ss')

        const embed = new global.star.manager.Ebl()
        embed.title(`💸 Daily | ${global.star.user.username}`)
        embed.description(`<:zu_info:911303533859590144> **${ctx.message.author.username}** ${ctx.idioma.daily.coletou.replace('%time', tt)}.`)
        embed.color('#dd3af0')
        embed.thumbnail(global.star.user.avatarURL)

        ctx.send(embed.create)
      } else {
        const q = await global.db.get(`money-${ctx.message.author.id}`)
        await global.db.set(`money-${ctx.message.author.id}`, Number(daily + q))
        await global.db.set(`dailytime-${ctx.message.author.id}`, Number(Date.now()))
        await global.db.set(`banco-${ctx.message.author.id}`, Number(0))

        const embed = new global.star.manager.Ebl()
        embed.title(`💸 Daily | ${global.star.user.username}`)
        embed.description(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace('%m', Number(daily))}`)
        embed.color('#dd3af0')
        embed.thumbnail(global.star.user.avatarURL)
        ctx.send(embed.create)
      }
    }
  }
}
