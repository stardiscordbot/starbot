module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: true
      },
      pt: {
        nome: 'topgg',
        categoria: '🤖 • Botlist',
        desc: 'Vê informações de um bot do top.gg'
      },
      en: {
        nome: 'topgg',
        categoria: '🤖 • Botlist',
        desc: 'View information from a top.gg bot'
      },
      aliases: ['top.gg', 'dbl'],
      run: this.run
    }
  }

  async run (ctx) {
    const { request } = require('axios')
    const bl = require('../../botlists.js')
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.topgg.men}`)
    const user = ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0])

    request({
      method: 'GET',
      url: `https://top.gg/api/bots/${user.id}`, // https://top.gg/api/bots/719524114536333342
      headers: { Authorization: bl.top }
    }).then(async response => {
      const res = response.data
      // console.log(res)
      const owner = await global.star.getRESTUser(res.owners[0])
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_botlist_topgg:836183481432276993> top.gg | ${user.username}#${user.discriminator}`)
      embed.url(`https://top.gg/bot/${user.id}`)
      embed.description(`${res.shortdesc}`)
      embed.field(`<:st_owner:845713255670087690> ${ctx.idioma.topgg.dono}`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.owners[0]}`, true)
      embed.field(`<:st_botlist_editado:831131713219461160> ${ctx.idioma.topgg.prefix}`, `${res.prefix}`, true)
      embed.field(`<:st_like:845646603368661002> ${ctx.idioma.topgg.votos}`, `${ctx.idioma.topgg.montly} **${res.monthlyPoints}**\nTotal: **${res.points}**`, true)
      embed.field('<:st_link:845643800080416770> Links:', `**Top.gg:** [${ctx.idioma.topgg.here}](https://top.gg/bot/${user.id})\n**Invite:** [${ctx.idioma.topgg.here}](${res.invite})\n**Github:** [${ctx.idioma.topgg.here}](${res.github || 'https://github.com/stardiscordbot/starbot'})\n**Website:** [${ctx.idioma.topgg.here}](${res.website || 'https://star-bot.tk'})`, true)
      embed.color('#dd3af0')
      embed.thumbnail(user.avatarURL)
      ctx.send(embed.create)
    }).catch((err) => {
      const embed = new global.star.manager.Ebl()
      embed.title(`${ctx.idioma.message.e}`)
      embed.description(`\`\`\`js\n${err}\n\`\`\``)
      embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
      embed.color('#ff0000')
      embed.thumbnail(global.star.user.avatarURL)
      return ctx.send(embed.create)
    })
  }
}
// ADG
