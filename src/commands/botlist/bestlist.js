module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'bestlist',
        categoria: '🤖 • Botlist',
        desc: 'Vê informações de um bot do bestlist.online'
      },
      en: {
        nome: 'bestlist',
        categoria: '🤖 • Botlist',
        desc: 'View information from a bestlist.online bot'
      },
      aliases: ['bestlistonline', 'bestlist.online', 'best'],
      run: this.run
    }
  }

  async run (ctx) {
    const { request } = require('axios')
    const bl = require('../../botlists.json')
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.topgg.men}`)
    const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])

    request({
      method: 'GET',
      url: `https://bestlist.online/api/bots/${user.id}`, // https://top.gg/api/bots/719524114536333342
      headers: { Authorization: bl.best }
    }).then(async response => {
      const res = response.data
      const owner = await star.getRESTUser(res.owners[0])
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_bestlist:851868925109338122> bestlist.online | ${user.username}#${user.discriminator}`)
      embed.url(`https://bestlist.online/bots/${user.id}`)
      embed.description(`${res.shortdesc}`)
      embed.field(`<:st_owner:845713255670087690> ${ctx.idioma.topgg.dono}`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.owners[0]}`, true)
      embed.field(`<:st_botlist_editado:831131713219461160> ${ctx.idioma.topgg.prefix}`, `${res.prefix}`, true)
      embed.field(`<:st_like:845646603368661002> ${ctx.idioma.topgg.votos}`, `Total: **${res.monthlyVotes}**`, true)
      embed.field('<:st_link:845643800080416770> Links:', `**Bestlist.online:** [${ctx.idioma.topgg.here}](https://bestlist.online/bots/${user.id})\n**Invite:** [${ctx.idioma.topgg.here}](https://discord.com/oauth2/authorize?client_id=${user.id}&scope=bot%20applications.commands&permissions=8)\n**Github:** [${ctx.idioma.topgg.here}](${res.github || 'https://github.com/stardiscordbot/starbot'})\n**Website:** [${ctx.idioma.topgg.here}](${res.website || 'https://star-bot.tk'})`, true)
      embed.color('#dd3af0')
      embed.thumbnail(user.avatarURL)
      ctx.send(embed.create)
    }).catch((e) => {
      const embed = new global.star.manager.Ebl()
      embed.title(`${ctx.idioma.message.e}`)
      embed.description(`\`\`\`js\n${err}\n\`\`\``)
      embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
      embed.color('#ff0000')
      embed.thumbnail(star.user.avatarURL)
      return ctx.send(embed.create)
    })
  }
}
// ADG
