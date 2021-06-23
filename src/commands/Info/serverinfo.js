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
    let guild = ctx.args[0] ? star.guilds.get(ctx.args[0], true) : ctx.message.channel.guild

    if (!guild) {
      guild = ctx.message.channel.guild
    }

    const owner = await star.getRESTUser(guild.ownerID)
    const embed = new global.star.manager.Ebl()

    embed.title(`<:st_discord:847806904808898600> ${guild.name}`)
    embed.color('#dd3af0')
    embed.field('❯ General Info:', `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n<:st_owner:847812042467573761> **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n<:st_membros:845390325638889482> **Members:** \`${guild.memberCount} members\`\n<a:st_booster:830837674104979488> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Region:** \`${guild.region}\``, true)
    embed.thumbnail(guild.iconURL || 'https://i.imgur.com/2dwGomm.png')
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
