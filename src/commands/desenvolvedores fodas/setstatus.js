module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: true
        },
        pt: {
          nome: 'setstatus',
          categoria: '💻 • Desenvolvedor',
          desc: 'Recarrega o bot'
        },
        en: {
          nome: 'setstatus',
          categoria: '💻 • Developer',
          desc: 'Reload bot'
        },
        aliases: ['setactivity', 'setgame', 'sa', 'status'],
        run: this.run
      }
    }
    async run(ctx) {
        if(!ctx.args[0]) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Eu preciso do status né? aff`)
        star.user.setActivity(`${ctx.args.join(" ")}`).then(a => {
            ctx.message.addMessageReaction("✅")
        })
  }
}
  
  // LRD