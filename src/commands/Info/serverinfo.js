module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'serverinfo',
        categoria: '📖 • Informação',
        desc: 'Veja informações de algum servidor'
      },
      en: {
        nome: 'serverinfo',
        categoria: '📖 • Information',
        desc: 'View server info'
      },
      aliases: ['guildinfo', 'gi', 'si', 'server', 'guild', 'servidor', 'servidorinfo', 'informação-servidor'],
      run: this.run
    }
  }

  async run (ctx) {
    const moment = require('moment')
    let guild = ctx.args[0] ? global.star.guilds.get(ctx.args[0], true) : ctx.message.channel.guild

    if (!guild) {
      guild = ctx.message.channel.guild
    }

    const owner = await global.star.getRESTUser(guild.ownerID)
    const embed = new global.star.manager.Ebl()

    embed.title(`__${guild.name}__`)
    embed.color('#dd3af0')
    embed.field('❯ General Info:', `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n<:ES_owner:815580078233747466> **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n<:ES_membros:815580090225262632> **Members:** \`${guild.memberCount} members\`\n🚀 **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Lang:** \`${guild.preferredLocale}\``, true)
    embed.thumbnail(guild.iconURL || 'https://i.imgur.com/2dwGomm.png')
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
