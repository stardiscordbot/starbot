module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'bluephoenix',
        categoria: '🤖 • Botlist',
        desc: 'Vê informações de um bot do bluephoenixlist.xyz'
      },
      en: {
        nome: 'bluephoenix',
        categoria: '🤖 • Botlist',
        desc: 'View information from a bluephoenix.xyz bot'
      },
      aliases: ['bluephoenixlistxyz', 'bluephoenix.xyz', 'bp', 'bpl', 'bluefish'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.topgg.men}`)
    const user = ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0])

    await global.star.bpl.getBot(user.id).then(async data => {
      const res = data
      console.log(data)
      const owner = await global.star.getRESTUser(res.data.id_do_dono)
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_bp:875463298856915034> bluephoenixlist.xyz | ${user.username}#${user.discriminator}`)
      embed.url(`https://bluephoenixlist.xyz/bot/${user.id}`)
      embed.description(`${res.data.descricao_curta}`)
      embed.field(`<:st_owner:845713255670087690> ${ctx.idioma.topgg.dono}`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.data.id_do_dono}`, true)
      embed.field(`<:st_botlist_editado:831131713219461160> ${ctx.idioma.topgg.prefix}`, `${res.data.prefixo}`, true)
      embed.field(`<:st_like:845646603368661002> ${ctx.idioma.topgg.votos}`, `Total: **${res.data.votos}**`, true)
      embed.field('<:st_link:845643800080416770> Links:', `**Bluephoenixlist.xyz:** [${ctx.idioma.topgg.here}](https://bluephoenixlist.xyz/bot/${user.id})\n**Invite:** [${ctx.idioma.topgg.here}](https://discord.com/oauth2/authorize?client_id=${user.id}&scope=bot%20applications.commands&permissions=8)\n**Github:** [${ctx.idioma.topgg.here}](${res.github || 'https://github.com/stardiscordbot/starbot'})\n**Website:** [${ctx.idioma.topgg.here}](${res.data.website || 'https://star-bot.tk'})`, true)
      embed.color('#dd3af0')
      embed.thumbnail(user.avatarURL)
      ctx.send(embed.create)
    })
  }
}
// ADG
