module.exports = class MessageEvent {
  constructor () {
    return {
      nome: 'messageCreate',
      run: this.run
    }
  }

  async run (message) {
    const prefix = 's!'
    if (message.author.bot) return
    const argumentos = message.content.slice(prefix.length).trim().split(/ +/)
    const cmd = argumentos.shift().toLowerCase()
    const args = argumentos
    if (cmd === 'eval') {
      if (message.author.id !== '717766639260532826') return
      try {
        // ! Já que o ADG é estúpido o bastante pra ter um comando de eval, não tem o que fazer
        // eslint-disable-next-line no-eval
        let code = await eval(args.join(' '))
        if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 })
        const embed = new global.star.manager.Ebl()
        embed.title(`💻 Eval • ${global.star.user.username}`)
        embed.field('📩 Entrada', `\`\`\`js\n${args.join(' ')}\`\`\``)
        embed.field('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
        embed.color('#dd3af0')
        embed.thumbnail(global.star.user.avatarURL)
        message.channel.createMessage(embed.create)
      } catch (e) {
        const embed2 = new global.star.manager.Ebl()
        embed2.title(`💻 Eval • ${global.star.user.username}`)
        embed2.field('📩 Entrada', `\`\`\`js\n${args.join(' ')}\`\`\``)
        embed2.field('🚩 Saída', `\`\`\`js\n${e}\n\`\`\``)
        embed2.color('#ff0000')
        embed2.thumbnail(global.star.user.avatarURL)
        message.channel.createMessage(embed2.create)
      }
    }
  }
}
