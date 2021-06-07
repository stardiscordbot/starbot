module.exports = class EvalCommand {
  constructor() {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'recarregar',
        categoria: '💻 • Desenvolvedor',
        desc: 'Recarrega o bot'
      },
      en: {
        nome: 'reload',
        categoria: '💻 • Developer',
        desc: 'Reload bot'
      },
      aliases: ['red', 'reload'],
      run: this.run
    }
  }
  async run(ctx) {
    ctx.send('🔁 Recarregando arquivos...')
    star.manager.reload()
    setTimeout(()=>{
      return ctx.message.channel.createMessage(`:white_check_mark: **|** ${ctx.message.author.mention} **${star.commands.size} comandos** e **${star._eventsCount} eventos** recarregados com sucesso.`)
      },800)
    }
}

// LRD