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
          desc: 'Recarrega o bot'
        },
        en: {
          nome: 'listcord',
          categoria: '🤖 • Botlist',
          desc: 'Reload bot'
        },
        aliases: ['listcordgg', 'listcord.gg', 'lsc'],
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
            url: `https://listcord.gg/api/bot/${user.id}`, //https://top.gg/api/bots/719524114536333342
            headers: { Authorization: bl.lsc }
        }).then(async response => {
            let res = response.data
            let owner = await star.getRESTUser(res.developers[0])
            const embed = new star.manager.ebl;
            embed.title(`<:st_listcord:845723224397709332> listcord.gg | ${user.username}#${user.discriminator}`)
            embed.url(`https://listcord.gg/bot/${user.id}`)
            embed.description(`${res.description.short}`)
            embed.field(`<:st_owner:845713255670087690> Owner:`, `**Tag:** ${owner.username}#${owner.discriminator}\n**ID:** ${res.developers[0]}`, true)
            embed.field(`<:st_botlist_editado:831131713219461160> Prefix:`, `${res.prefix}`, true)
            embed.field(`<:st_like:845646603368661002> Votes:`, `Total: **${res.upvotes}**`, true)
            embed.field(`<:st_link:845643800080416770> Links:`, `**Listcord.gg:** [Click Here](https://listcord.gg/bot/${user.id})\n**Invite:** [Click Here](https://discord.com/oauth2/authorize?client_id=${user.id}&scope=bot%20applications.commands&permissions=${res.required_permissions})\n**Github:** [Click Here](${res.github})\n**Website:** [Click Here](${res.website})`, true)
            embed.color('#dd3af0')
            embed.thumbnail(user.avatarURL)
            ctx.message.channel.createMessage(embed.create)
        }).catch((e) => {
            ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** \`${e}\``)
        })
  }
}
// ADG