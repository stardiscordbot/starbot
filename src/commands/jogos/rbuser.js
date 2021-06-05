module.exports = class RbuserCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'rbuser',
          categoria: '🎮 • Jogos',
          desc: 'Veja informações de algum perfil do roblox'
        },
        en: {
          nome: 'rbuser',
          categoria: '🎮 • Jogos',
          desc: 'View information from a roblox profile'
        },
        aliases: ['rbplayer'],
        run: this.run
      }
    }
    async run(ctx) {
      const {request} = require("axios")
      const moment = require("moment")
      if(!ctx.args[0]) return ctx.addMessageReaction("❌")
      request({
        method: 'GET',
        url: `https://api.roblox.com/users/get-by-username?username=${ctx.args.join(" ").replace(/#/g, '').replace(/ /g, '_')}`
      }).then(response => {
        let res = response.data
        let avatar = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${res.Username}`
        request({
          method: 'GET',
          url: `https://users.roblox.com/v1/users/${res.Id}`
        }).then(resp => {
          request({
            method: 'GET',
            url: `https://friends.roblox.com/v1/users/${res.Id}/friends/count`
          }).then(resp2 => {
            request({
              method: 'GET',
              url: `https://friends.roblox.com/v1/users/${res.Id}/followers/count`
            }).then(resp3 => {
          
        let inf = resp.data
        let inf2 = resp2.data
        let inf3 = resp3.data
        const embed = new star.manager.ebl;
        embed.title(`<:st_roblox:841002260490092544> Roblox | ${res.Username}`)
        embed.color('#dd3af0')
        embed.field(`💻 User ID:`, `\`\`\`${res.Id}\`\`\``)
        embed.field(`${ctx.idioma.roblox.criado}`, `\`\`\`🗓️ ${moment(inf.created).format('DD/MM/YYYY')}\n⏰ ${moment(inf.created).format('HH:mm:ss')}\`\`\``)
        embed.field(`<:st_membros:845390325638889482> Social:`, `\`\`\`${inf2.count} Friends\n${inf3.count} Followers\`\`\``)
        embed.thumbnail(avatar)
        ctx.message.channel.createMessage(embed.create)
          }).catch((err) => {
            return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.avatar.unknown}`)
          })
        }).catch((err) => {
          return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.avatar.unknown}`)
        })
      }).catch((err) => {
        return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.avatar.unknown}`)
      })
    }).catch((err) => {
      return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.avatar.unknown}`)
    })
  }
}  
// ADG