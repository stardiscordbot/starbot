module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'eval',
        categoria: '💻 • Desenvolvedor',
        desc: 'Executa codigos'
      },
      en: {
        nome: 'eval',
        categoria: '💻 • Developer',
        desc: 'Evaluate codes'
      },
      aliases: ['e', 'exec', 'evaluate'],
      run: this.run
    }
  }

  async run (ctx) {
    const { request } = require('axios')
    if (!ctx.args[0]) return

    // https://eval.adgdeveloper.tk/eval
    await request({
      url: 'https://eval.adgdeveloper.tk/eval',
      method: 'POST',
      data: {
        code: ctx.args.join(' ')
      }
    }).then(response => {
      const embed = new global.star.manager.Ebl()
      embed.title(`💻 Eval • ${global.star.user.username}`)
      embed.field('📩 Entrada', `\`\`\`js\n${ctx.args.join(' ')}\`\`\``)
      embed.field('🚩 Saída', `\`\`\`js\n${response.data.slice(0, 1010)}\n\`\`\``)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      ctx.message.channel.createMessage(embed.create)
    }).catch((e) => {
      const embed = new global.star.manager.Ebl()
      embed.title(`💻 Eval • ${global.star.user.username}`)
      embed.field('📩 Entrada', `\`\`\`js\n${ctx.args.join(' ')}\`\`\``)
      embed.field('🚩 Saída', '```js\nundefined\n```')
      embed.color('#ff0000')
      embed.thumbnail(global.star.user.avatarURL)
    })
  }
}
