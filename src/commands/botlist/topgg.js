module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'topgg',
          categoria: '🤖 • Botlist',
          desc: 'Recarrega o bot'
        },
        en: {
          nome: 'topgg',
          categoria: '🤖 • Botlist',
          desc: 'Reload bot'
        },
        aliases: ['top.gg', 'dbl'],
        run: this.run
      }
    }
    async run(ctx) {
        const {request} = require("axios")
        const bl = require("../../botlists.json")
        if(!ctx.args[0]) return ctx.addMessageReaction("❌")
        const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])
        
        request({
            method: 'GET',
            url: `https://top.gg/api/bots/${user.id}`, //https://top.gg/api/bots/719524114536333342
            headers: { Authorization: bl.top }
        }).then(async response => {
            let res = response.data
            //console.log(res)
            let owner = await star.getRESTUser(res.owners[0])
            const embed = new star.manager.ebl;
            embed.title(`<:st_botlist_topgg:836183481432276993> top.gg | ${user.tag}`)
            embed.url(`https://top.gg/bot/${user.id}`)
            embed.description(`${res.shortdesc}`)
            embed.field(`<:st_owner:845713255670087690> Owner:`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.owners[0]}`, true)
            embed.field(`<:st_botlist_editado:831131713219461160> Prefix:`, `${res.prefix}`, true)
            embed.field(`<:st_like:845646603368661002> Votes:`, `Monthly: **${res.monthlyPoints}**\nTotal: **${res.points}**`, true)
            embed.field(`<:st_link:845643800080416770> Links:`, `**Top.gg:** [Click Here](https://top.gg/bot/${user.id})\n**Invite:** [Click Here](${res.invite})\n**Github:** [Click Here](${res.github})\n**Website:** [Click Here](${res.website})`, true)
            embed.color('#dd3af0')
            embed.thumbnail(user.avatarURL)
            ctx.message.channel.createMessage(embed.create)
        }).catch((e) => {
            ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** \`${e}\``)
        })
  }
}
// ADG
