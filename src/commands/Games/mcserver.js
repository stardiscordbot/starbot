module.exports = class McserverCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'mcserver',
        categoria: '🎮 • Jogos',
        desc: 'Mostra a informaçoes de algum servidor do minecraft.'
      },
      en: {
        nome: 'mcserver',
        categoria: '🎮 • Jogos',
        desc: 'Display information from some minecraft server.'
      },
      aliases: ['minecraft', 'minecraftsever', 'sever', 'servidor', 'mserver'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term.replace('termo', 'servidor').replace('term', 'server')}`)
    const fetch = require('star-fetch')
    const res = fetch(`https://api.minetools.eu/ping/${ctx.args.join(' ')}`)
    const banner = `http://status.mclive.eu/${encodeURIComponent(ctx.idioma.mcserver.title)}/${ctx.args.join(' ')}/25565/banner.png`
    const icon = `https://api.mcsrvstat.us/icon/${ctx.args.join(' ')}`

    const embed = new global.star.manager.Ebl()
    embed.title(`🔨 ${ctx.idioma.mcserver.title} | ${ctx.args.join(' ').toLowerCase()}`)
    embed.description(`\`\`\`${res.description}\`\`\``)
    embed.field('🏓 Ping:', `\`${res.latency.toFixed(2)}ms\``)
    embed.field(`⚡ ${ctx.idioma.mcserver.ver}`, `\`${res.version.name}\``)
    embed.field(`🎮 ${ctx.idioma.mcserver.p}`, `\`${res.players.online}/${res.players.max}\``)
    embed.color('#dd3af0')
    embed.image(banner)
    embed.thumbnail(icon || global.star.user.avatarURL)
    ctx.send(embed.create)
  }
}
