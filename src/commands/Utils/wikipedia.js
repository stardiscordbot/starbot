module.exports = class WikipediaCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'wikipedia',
        categoria: '🕰️ • Utilidades',
        desc: 'Para pesquisar algum artigo no wikipedia'
      },
      en: {
        nome: 'wikipedia',
        categoria: '🕰️ • Utility',
        desc: 'To search for an article on wikipedia'
      },
      aliases: ['wiki', 'wp', 'wkp'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const { get } = require('axios')
    let url

    if (ctx.idioma.pdex.lang !== 'en') {
      url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.args.join(' '))}`
    } else {
      url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.args.join(' '))}`
    }

    get(`${url}`, { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36' }).then(tes => {
      const res = tes.data
      // console.log(res)
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_wiki:860857720276779029> Wikipedia • ${res.title}`)
      embed.url(res.content_urls.desktop.page)
      embed.description(res.extract)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      ctx.send(embed.create)
    }).catch((e) => {
      ctx.send(`:x: ${ctx.message.author.mention} **|** No results for: \`${ctx.args.join(' ').replace(/`/g, '')}\``)
    })
  }
}
