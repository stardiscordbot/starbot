module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'listcord',
          categoria: '🤖 • Botlist',
          desc: 'Vê informações de um bot do listcord.gg'
        },
        en: {
          nome: 'listcord',
          categoria: '🤖 • Botlist',
          desc: 'View information from a listcord.gg bot'
        },
        aliases: ['listcordgg', 'listcord.gg', 'lsc'],
        run: this.run
      }
    }
    async run(ctx) {
        const {request} = require("axios")
        const bl = require("../../botlists.json")
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.topgg.men}`)
        const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])
        
        request({
            method: 'GET',
            url: `https://listcord.gg/api/bot/${user.id}`, //https://top.gg/api/bots/719524114536333342
            headers: { Authorization: bl.lsc }
        }).then(async response => {
            let res = response.data
            let owner = await star.getRESTUser(res.developers[0])
            const embed = new star.manager.ebl;
            embed.title(`<:st_listcord:845723224397709332> listcord.gg | ${user.username}#${user.discriminator}`)
            embed.url(`https://listcord.gg/bot/${user.id}`)
            embed.description(`${res.description.short}`)
            embed.field(`<:st_owner:845713255670087690> ${ctx.idioma.topgg.dono}`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.developers[0]}`, true)
            embed.field(`<:st_botlist_editado:831131713219461160> ${ctx.idioma.topgg.prefix}`, `${res.prefix}`, true)
            embed.field(`<:st_like:845646603368661002> ${ctx.idioma.topgg.votos}`, `Total: **${res.upvotes}**`, true)
            embed.field(`<:st_link:845643800080416770> Links:`, `**Listcord.gg:** [${ctx.idioma.topgg.here}](https://listcord.gg/bot/${user.id})\n**Invite:** [${ctx.idioma.topgg.here}](https://discord.com/oauth2/authorize?client_id=${user.id}&scope=bot%20applications.commands&permissions=${res.required_permissions})\n**Github:** [${ctx.idioma.topgg.here}](${res.github || "https://github.com/stardiscordbot/starbot"})\n**Website:** [${ctx.idioma.topgg.here}](${res.website || "https://star-bot.tk"})`, true)
            embed.color('#dd3af0')
            embed.thumbnail(user.avatarURL)
            ctx.send(embed.create)
        }).catch((e) => {
          const embed = new star.manager.ebl;
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