module.exports = class EvalCommand {
  constructor() {
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
  async run(ctx) {

    let args = ctx.args;
    
    if(!args.length) return ctx.send("Da um eval ai meu patrão")

    try {
      var ram = (process.memoryUsage().rss/1024/1024).toFixed(2);
      let bot = star;
      let c = star;
      this.client = star;
      let client = star;
      let message = ctx.message;
      let m = ctx.message;
      let msg = ctx.message;
      let lexy = "#vemdelexy"
      let code = await eval(args.join(" "));
      if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
      const embed = new star.manager.ebl;
      embed.title(`💻 Eval • ${star.user.username}`)
      embed.field(`📩 Entrada`, `\`\`\`js\n${args.join(" ")}\`\`\``)
      embed.field(`🚩 Saída`, `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
      embed.color('#dd3af0')
      embed.thumbnail(star.user.avatarURL)
      ctx.send(embed.create)

    } catch(e) {
      const embed2 = new star.manager.ebl;
      embed2.title(`💻 Eval • ${star.user.username}`)
      embed2.field(`📩 Entrada`, `\`\`\`js\n${args.join(" ")}\`\`\``)
      embed2.field(`🚩 Saída`, `\`\`\`js\n${e}\n\`\`\``)
      embed2.color('#ff0000')
      embed2.thumbnail(star.user.avatarURL)
      ctx.send(embed2.create)
    }
  }
}

// BONEE :) - LRD DIZ: Por isso fico uma merda.