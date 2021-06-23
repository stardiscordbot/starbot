module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'docs',
        categoria: '🕰️ • Utilidades',
        desc: 'Veja alguma coisa na documentação do discord.js'
      },
      en: {
        nome: 'docs',
        categoria: '🕰️ • Utility',
        desc: 'See something in the discord.js documentation'
      },
      aliases: ['discord.js', 'djs'],
      run: this.run
    }
  }

  async run (ctx) {
    const fetch = require('star-fetch')
    const res = fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(ctx.args.join(' '))}`)
    // console.log(res)
    const embed = new global.star.manager.Ebl()
    embed.title('<:st_djs:847082239975882752> Discord.js Docs')
    embed.color('#dd3af0')
    embed.thumbnail(star.user.avatarURL)
    if (!res.fields) {
      embed.description(`${res.description}`)
      ctx.send(embed.create)
    } else {
      res.fields.map(resu => {
        if (resu.value.includes('View source')) return
        embed.description(`>>> 📘 ${res.description}`)
        embed.field(resu.name, resu.value)
      })
      ctx.send(embed.create)
    }
  }
}

// ADG, Davi e LRD
