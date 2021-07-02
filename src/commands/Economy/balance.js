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

    const money = await global.db.get(`money-${user.id}`) || 0
    const banco = await global.db.get(`banco-${user.id}`) || 0

    const embed = new global.star.manager.Ebl()
    embed.title(`💸 Banco | ${global.star.user.username}`)
    embed.field(`❯ ${ctx.idioma.economy.carteira}`, `**${user.username}:** **¥ ${money.toLocaleString()}**`, true)
    embed.field(`❯ ${ctx.idioma.economy.banco}`, `**${user.username}:** **¥ ${banco.toLocaleString()}**`, true)
    embed.color('#dd3af0')
    embed.thumbnail('https://i.imgur.com/VW4x1en.png')
    ctx.send(embed.create)
  }
}
