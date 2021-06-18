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
          desc: 'Atualiza o status do bot'
        },
        en: {
          nome: 'setstatus',
          categoria: '💻 • Developer',
          desc: 'Update bot status'
        },
        aliases: ['setactivity', 'setgame', 'sa', 'status'],
        run: this.run
      }
    }
    async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Eu preciso do status né? aff`)
        star.editStatus({
          game: star.user.username,
          name: `${ctx.args.join(" ")}`,
          type: 5
        })
        ctx.message.addReaction("✅")
  }
}
  
  // LRD