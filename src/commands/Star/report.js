module.exports = class ReportCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'report',
        categoria: '⭐ • Star',
        desc: 'Reporta um usuário que está indo contra as regras do discord/star'
      },
      en: {
        nome: 'report',
        categoria: '⭐ • Star',
        desc: 'Reports a user who is going against the discord/star rules'
      },
      aliases: ['reportar'],
      run: this.run
    }
  }

  async run (ctx) {
    const proto = Math.random().toString(36).slice(2, 10)
    const link = `https://docs.google.com/forms/d/e/1FAIpQLSc62AsAArfsXXfrRDbTZXrb8pUlXB4Tgqw86Uazbasa-JySCA/viewform?usp=pp_url&entry.595373523=${proto}`

    const dm = await global.star.getDMChannel(ctx.message.author.id)

    try {
      dm.createMessage(`✅ ${ctx.idioma.report.p1}\n\n> 📋 ${ctx.idioma.report.id} ||\`${proto}\`||\n\n🔗 Link: ${link}`).then(async msg => {
        global.db.set(proto, ctx.message.author.id)
        msg.addReaction(':ES_panda:815580024811814913')
        const ch = await global.star.getRESTChannel('930489969322098708')
        ch.createMessage(`__**🔔 <@&930489884483924069> Nova Denúncia!**__\n\n- Autor: **${ctx.message.author.username}#${ctx.message.author.discriminator} (${ctx.message.author.id})**\n- ID do formulário: **${proto}**`)
      })
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.report.dm}`)
    } catch (err) {
      ctx.message.channel.createMessage(`✅ ${ctx.idioma.report.p1}\n\n> 📋 ID do formulário: ||\`${proto}\`||\n\n🔗 Link: ${link}`).then(async msg => {
        global.db.set(proto, ctx.message.author.id)
        msg.addReaction(':ES_panda:815580024811814913')
        const ch = await global.star.getRESTChannel('930489969322098708')
        ch.createMessage(`__**🔔 <@&930489884483924069> Nova Denúncia!**__\n\n- Autor: **${ctx.message.author.username}#${ctx.message.author.discriminator} (${ctx.message.author.id})**\n- ID do formulário: **${proto}**`)
      })
    }
  }
}
