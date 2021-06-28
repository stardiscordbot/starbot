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
        categoria: '🤖 • Botlist',
        desc: 'Vê informações de um bot do bestlist.online'
      },
      en: {
        nome: 'metar',
        categoria: '🤖 • Botlist',
        desc: 'View information from a bestlist.online bot'
      },
      aliases: ['met', 'airport', 'best'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Cadê o aeroporto? Nn sei`)
    const { get } = require('axios')
    const pkey = require('../../apikeys.json')

    get(`https://api.checkwx.com/metar/${ctx.args[0].toUpperCase()}/decoded`, { headers: { 'X-API-Key': pkey.checkwx } }).then(resp => {
      resp.data.data.forEach(metar => {
        console.log(metar.clouds)
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
