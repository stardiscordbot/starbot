module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'balance',
        categoria: '💸 • Economia',
        desc: 'Mostra a quantidade de money de algum usuário'
      },
      en: {
        nome: 'balance',
        categoria: '💸 • Economy',
        desc: 'Shows the amount of money of any user'
      },
      aliases: ['bal', 'carteira', 'banco', 'money', 'bank', 'atm'],
      run: this.run
    }
  }

  async run (ctx) {
    const user = ctx.args[0] ? ctx.message.mentions[0] || await global.star.user.fetch(ctx.args[0]) : ctx.message.author

    const money = await global.db.get(`money-${user.id}`) || Number(0)
    const banco = await global.db.get(`banco-${user.id}`) || Number(0)

    const num1 = Number(money)
    const num2 = Number(banco)

    const embed = new global.star.manager.Ebl()
    embed.title(`💸 Banco | ${global.star.user.username}`)
    embed.field(`❯ ${ctx.idioma.economy.carteira}`, `**${user.username}:** **¥ ${num1.toLocaleString()}**`, true)
    embed.field(`❯ ${ctx.idioma.economy.banco}`, `**${user.username}:** **¥ ${num2.toLocaleString()}**`, true)
    embed.color('#dd3af0')
    embed.thumbnail('https://i.imgur.com/VW4x1en.png')
    ctx.send(embed.create)
  }
}
