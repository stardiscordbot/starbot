module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'sac',
        categoria: '💸 • Economia',
        desc: 'Pega seu bonûs diário'
      },
      en: {
        nome: 'sac',
        categoria: '💸 • Economy',
        desc: 'Take you daily bonûs'
      },
      aliases: ['sacar', 'sacc'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.sc1}`)

    const money = await global.db.get(`money-${ctx.message.author.id}`) || Number(0)
    const banco = await global.db.get(`banco-${ctx.message.author.id}`) || Number(0)

    if (Number(banco) === Number(0) || Number(banco) < Number(0)) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.nomoney}`)

    if (ctx.args[0] === 'all' || ctx.args[0] === 'tudo') {
      await global.db.set(`banco-${ctx.message.author.id}`, Number(banco) - Number(money))
      await global.db.set(`money-${ctx.message.author.id}`, Number(money) + Number(banco)) // Vai dar 0 mas eu quero fazer assim então ;p
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.sc1} **¥ ${money.toLocaleString()}** ${ctx.idioma.economy.sac.sc2}`)
    } else {
      if (isNaN(ctx.args[0])) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.inv}`)

      if (Number(ctx.args[0]) < Number(0) || Number(ctx.args[0]) > Number(banco)) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.nomoney}`)

      await global.db.set(`banco-${ctx.message.author.id}`, Number(banco) - Number(ctx.args[0]))
      await global.db.set(`money-${ctx.message.author.id}`, Number(money) + Number(ctx.args[0])) // Vai dar 0 mas eu quero fazer assim então ;p

      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.sac.sc1} **¥ ${ctx.args[0].toLocaleString()}** ${ctx.idioma.economy.sac.sc2}`)
    }
  }
}
