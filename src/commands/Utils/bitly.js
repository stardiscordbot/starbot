module.exports = class AvatarCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'encurtar',
        categoria: '🕰️ • Utilidades',
        desc: 'Encurta um link usando o bit.ly.'
      },
      en: {
        nome: 'shorten',
        categoria: '🕰️ • Utility',
        desc: 'Shortens a link using bit.ly.'
      },
      aliases: ['shorten', 'bitly'],
      run: this.run
    }
  }

  async run (ctx) {
    const { request } = require('axios')
    const config = require('../../config/config')
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.isgd.nolink}`)
    request({
      method: 'POST',
      url: 'https://api-ssl.bitly.com/v4/bitlinks',
      headers: {
        Authorization: `Bearer ${config.bitly}`,
        'Content-Type': 'application/json'
      },
      data: {
        domain: 'bit.ly',
        long_url: ctx.args[0]
      }
    }).then(response => {
      const res = response.data
      const embed = new global.star.manager.Ebl()
      embed.title('<:st_link:845643800080416770> bit.ly')
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      embed.description(`**${ctx.message.author.username}**, ${ctx.idioma.isgd.link} ${res.link}`)
      ctx.send(embed.create)
    })
  }
}
