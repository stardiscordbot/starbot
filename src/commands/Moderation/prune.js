module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['manageMessages'], // Permissoes que o usuario necessita
        bot: ['manageMessages'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'prune',
        categoria: '🔨 • Moderação',
        desc: 'Limpe as mensagens de algum canal'
      },
      en: {
        nome: 'prune',
        categoria: '🔨 • Moderation',
        desc: 'See bot latency'
      },
      aliases: ['clear', 'c', 'purge', 'clean', 'limpar', 'bulkdelete'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.clear.no}`)
    // ctx.message.delete()
    if (Number(ctx.args[0]) > 2000 || Number(ctx.args[0]) < 2) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.clear.num}`)
    const ids = []
    const messages = await ctx.message.channel.getMessages(Number(ctx.args[0]))

    messages.forEach((m) => {
      ids.push(m.id)
    })

    ctx.message.channel.deleteMessages(ids)
    ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** **${ctx.args[0]} ${ctx.idioma.clear.msg}.`)
  }
}

// ADG, Davi e LRD
