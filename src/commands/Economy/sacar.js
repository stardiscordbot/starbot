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
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para sacar.`)

    const money = await global.db.get(`money-${ctx.message.author.id}`) || 0
    const banco = await global.db.get(`banco-${ctx.message.author.id}`) || 0

    if (banco === 0 || banco < 0) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não dinheiro em seu banco.`)

    if (ctx.args[0] === 'all' || ctx.args[0] === 'tudo') {
      await global.db.set(`banco-${ctx.message.author.id}`, banco - money)
      await global.db.set(`money-${ctx.message.author.id}`, money + banco) // Vai dar 0 mas eu quero fazer assim então ;p
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você sacou **¥ ${money.toLocaleString()}** em seu banco.`)
    } else {
      if (isNaN(ctx.args[0])) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

      if (ctx.args[0] < 0 || ctx.args[0] > money) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não tem esse valor.`)

      await global.db.set(`banco-${ctx.message.author.id}`, banco - ctx.args[0])
      await global.db.set(`money-${ctx.message.author.id}`, money + ctx.args[0]) // Vai dar 0 mas eu quero fazer assim então ;p

      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você sacou **¥ ${ctx.args[0].toLocaleString()}** em seu banco.`)
    }
  }
}
