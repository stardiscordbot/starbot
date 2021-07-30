module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'eval',
        categoria: '💻 • Desenvolvedor',
        desc: 'Roda codigos'
      },
      en: {
        nome: 'eval',
        categoria: '💻 • Developer',
        desc: 'Run codes'
      },
      aliases: ['e', 'ev'],
      run: this.run
    }
  }

  async run (ctx) {
    const args = ctx.args

    if (!args.length) return ctx.send('Da um eval ai meu patrão')

    if (args.join(' ').includes('717766639260532826')) return ctx.send(':x: Não execute evals com meu criador.')

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
      ctx.send(embed.create)
    } catch (e) {
      const embed2 = new global.star.manager.Ebl()
      embed2.title(`💻 Eval • ${global.star.user.username}`)
      embed2.field('📩 Entrada', `\`\`\`js\n${args.join(' ')}\`\`\``)
      embed2.field('🚩 Saída', `\`\`\`js\n${e}\n\`\`\``)
      embed2.color('#ff0000')
      embed2.thumbnail(global.star.user.avatarURL)
      ctx.send(embed2.create)
    }
  }
}

// BONEE :) - LRD DIZ: Por isso fico uma merda.
