module.exports = class EvalCommand {
  constructor () {
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

  async run (ctx) {
    ctx.send('🔁 Recarregando arquivos...')
    global.star.manager.reload()
    setTimeout(() => {
      return ctx.send(`:white_check_mark: **|** ${ctx.message.author.mention} **${global.star.commands.size} comandos** e **${global.star._eventsCount} eventos** recarregados com sucesso.`)
    }, 800)
  }
}

// LRD
