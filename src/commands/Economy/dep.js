module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'dep',
        categoria: '💸 • Economia',
        desc: 'Pega seu bonûs diário'
      },
      en: {
        nome: 'dep',
        categoria: '💸 • Economy',
        desc: 'Take you daily bonûs'
      },
      aliases: ['depositar', 'deposit'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

    const money = await global.db.get(`money-${ctx.message.author.id}`) || 0
    const banco = await global.db.get(`banco-${ctx.message.author.id}`) || 0

    if (money === 0 || money < 0) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não dinheiro em sua carteira.`)

    if (ctx.args[0] === 'all' || ctx.args[0] === 'tudo') {
      await global.db.set(`banco-${ctx.message.author.id}`, banco + money)
      await global.db.set(`money-${ctx.message.author.id}`, money - money)
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você depositou **¥ ${money.toLocaleString()}** emseu banco.`)
    } else {
      if (isNaN(ctx.args[0])) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

      if (ctx.args[0] < 0 || ctx.args[0] > money) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não tem esse valor.`)

      await global.db.set(`banco-${ctx.message.author.id}`, banco + ctx.args[0])
      await global.db.set(`money-${ctx.message.author.id}`, money - ctx.args[0])

      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você depositou **¥ ${ctx.args[0].toLocaleString()}** em seu banco.`)
    }
  }
}
