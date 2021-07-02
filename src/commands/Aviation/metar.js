module.exports = class MetarCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'metar',
        categoria: '✈️ • Aviação',
        desc: 'Vê informações de algum aeroporto'
      },
      en: {
        nome: 'metar',
        categoria: '✈️ • Aviation',
        desc: 'View information from a airport'
      },
      aliases: ['met', 'airport', 'atis'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.metar.noarg}`)
    if (ctx.args[0].length > 4 || ctx.args[0].length < 4) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.metar.invalid}`)
    const { get } = require('axios')
    const pkey = require('../../apikeys.json')
    get(`https://api.checkwx.com/metar/${ctx.args[0].toUpperCase()}/decoded`, { headers: { 'X-API-Key': pkey.checkwx } }).then(resp => {
      resp.data.data.forEach(metar => {
        const embed = new global.star.manager.Ebl()
        embed.title(`🌎 ${metar.station.name}`)
        embed.field('🛩️ Icao Code:', `\`\`\`${metar.icao}\`\`\``)
        embed.field('📖 Raw Report:', `\`\`\`${metar.raw_text}\`\`\``)
        embed.field('🧑‍✈️ Flight Rule:', `\`\`\`${metar.flight_category}\`\`\``)
        embed.field('☁️ Clouds:', `> **Feet:** ${metar.clouds[0].base_feet_agl || 0}\n> **Meters:** ${metar.clouds[0].base_meters_agl || 0}`)
        embed.field('🗺️ Location:', `\`\`\`${metar.station.location}\`\`\``)
        embed.color('#dd3af0')
        ctx.message.channel.createMessage(embed.create)
      })
    })
  }
}
