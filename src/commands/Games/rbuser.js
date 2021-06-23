module.exports = class RbuserCommand {
  constructor () {
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

  async run (ctx) {
    const { request } = require('axios')
    const moment = require('moment')
    if (!ctx.args[0]) return ctx.addReaction('❌')
    request({
      method: 'GET',
      url: `https://api.roblox.com/users/get-by-username?username=${ctx.args.join(' ').replace(/#/g, '').replace(/ /g, '_')}`
    }).then(response => {
      const res = response.data
      const avatar = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${res.Username}`
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
            const inf = resp.data
            const inf2 = resp2.data
            const inf3 = resp3.data
            const embed = new global.star.manager.Ebl()
            embed.title(`<:st_roblox:841002260490092544> Roblox | ${res.Username}`)
            embed.color('#dd3af0')
            embed.field('💻 User ID:', `\`\`\`${res.Id}\`\`\``)
            embed.field(`${ctx.idioma.roblox.criado}`, `\`\`\`🗓️ ${moment(inf.created).format('DD/MM/YYYY')}\n⏰ ${moment(inf.created).format('HH:mm:ss')}\`\`\``)
            embed.field('<:st_membros:845390325638889482> Social:', `\`\`\`${inf2.count} Friends\n${inf3.count} Followers\`\`\``)
            embed.thumbnail(avatar)
            ctx.send(embed.create)
          }).catch((err) => {
            const embed = new global.star.manager.Ebl()
            embed.title(`${ctx.idioma.message.e}`)
            embed.description(`\`\`\`js\n${err}\n\`\`\``)
            embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
            embed.color('#ff0000')
            embed.thumbnail(star.user.avatarURL)
            return ctx.send(embed.create)
          })
        }).catch((err) => {
          const embed = new global.star.manager.Ebl()
          embed.title(`${ctx.idioma.message.e}`)
          embed.description(`\`\`\`js\n${err}\n\`\`\``)
          embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
          embed.color('#ff0000')
          embed.thumbnail(star.user.avatarURL)
          return ctx.send(embed.create)
        })
      }).catch((err) => {
        const embed = new global.star.manager.Ebl()
        embed.title(`${ctx.idioma.message.e}`)
        embed.description(`\`\`\`js\n${err}\n\`\`\``)
        embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
        embed.color('#ff0000')
        embed.thumbnail(star.user.avatarURL)
        return ctx.send(embed.create)
      })
    }).catch((err) => {
      const embed = new global.star.manager.Ebl()
      embed.title(`${ctx.idioma.message.e}`)
      embed.description(`\`\`\`js\n${erro}\n\`\`\``)
      embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
      embed.color('#ff0000')
      embed.thumbnail(star.user.avatarURL)
      return ctx.send(embed.create)
    })
  }
}
// ADG
