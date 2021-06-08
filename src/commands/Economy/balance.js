module.exports = class EvalCommand {
    constructor() {
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
    async run(ctx) {
        const user = ctx.args[0] ? ctx.message.mentions[0] || await star.user.fetch(ctx.args[0]) : ctx.message.author
        
        const money = await db.get(`money-${user.id}`) || 0;
        const banco = await db.get(`banco-${user.id}`) || 0;
        
        const embed = new star.manager.ebl;
        embed.title(`💸 Banco | ${star.user.username}`)
        embed.field(`❯ Carteira:`, `**${user.username}** tem **¥ ${money.toLocaleString()}** em sua carteira.`, true)
        embed.field(`❯ Banco:`, `**${user.username}** tem **¥ ${banco.toLocaleString()}** no banco.`, true)
        embed.color('#dd3af0')
        embed.thumbnail('https://i.imgur.com/VW4x1en.png')
        ctx.send(embed.create)

    }
}