module.exports = class DailyCommand {
    constructor() {
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
    async run(ctx) {
        if(!ctx.args[0]) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para sacar.`)

        const money = await db.get(`money-${ctx.message.author.id}`) || 0;
        const banco = await db.get(`banco-${ctx.message.author.id}`) || 0;

        if(banco == 0 || banco < 0) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Você não dinheiro em seu banco.`)
        
        if(ctx.args[0] == "all" || ctx.args[0] == "tudo") {
            await db.set(`banco-${ctx.message.author.id}`, banco - money)
            await db.set(`money-${ctx.message.author.id}`, money + banco) //Vai dar 0 mas eu quero fazer assim então ;p
            ctx.message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** Você sacou **¥ ${money.toLocaleString()}** em seu banco.`)
        } else {
            if(isNaN(ctx.args[0])) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Insira um quantia **válida** para depositar.`)

        if(ctx.args[0] < 0 || ctx.args[0] > money) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Você não tem esse valor.`)
        
        await db.set(`banco-${ctx.message.author.id}`, banco - ctx.args[0])
        await db.set(`money-${ctx.message.author.id}`, money + ctx.args[0]) //Vai dar 0 mas eu quero fazer assim então ;p

        ctx.message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** Você sacou **¥ ${ctx.args[0].toLocaleString()}** em seu banco.`)
        }
    }
}