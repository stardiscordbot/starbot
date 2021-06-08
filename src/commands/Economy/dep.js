module.exports = class DailyCommand {
    constructor() {
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
    async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

        const money = await db.get(`money-${ctx.message.author.id}`) || 0;
        const banco = await db.get(`banco-${ctx.message.author.id}`) || 0;

        if(money == 0 || money < 0) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não dinheiro em sua carteira.`)
        
        if(ctx.args[0] == "all" || ctx.args[0] == "tudo") {
            await db.set(`banco-${ctx.message.author.id}`, eval(banco + money))
            await db.set(`money-${ctx.message.author.id}`, eval(money - money)) //Vai dar 0 mas eu quero fazer assim então ;p
            ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você depositou **¥ ${money.toLocaleString()}** em seu banco.`)
        } else {
            if(isNaN(ctx.args[0])) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

        if(ctx.args[0] < 0 || ctx.args[0] > money) return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não tem esse valor.`)
        
        await db.set(`banco-${ctx.message.author.id}`, banco + ctx.args[0])
        await db.set(`money-${ctx.message.author.id}`, money - ctx.args[0]) //Vai dar 0 mas eu quero fazer assim então ;p

        ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Você depositou **¥ ${ctx.args[0].toLocaleString()}** em seu banco.`)
        }
    }
}