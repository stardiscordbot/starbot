module.exports = class GuildCreate {
  constructor () {
    return {
      nome: 'guildCreate',
      run: this.run
    }
  }

  async run (guild) {
    const system = require('../config/system')
    const ch = await global.star.getRESTChannel('848955667866976276')

    ch.edit({
      name: `🧭 → Servers [${global.star.guilds.size}]`
    })

    const moment = require('moment')
    const owner = await global.star.getRESTUser(guild.ownerID)

    if (guild.region !== 'brazil') {
      await global.db.set(`idioma-${guild.id}`, 'en-us')
    }

    await global.star.executeWebhook(system.gcreate.id, system.gcreate.token, {
      avatarURL: global.star.user.avatarURL,
      username: global.star.user.username,
      embeds: [{
        color: 14498544,
        title: `<:st_util_info:835532528617259068> GuildCreate | ${global.star.user.username}`,
        description: '<:st_random_pato:830842917790810183> Fui adicionada em um servidor, yeah!',
        fields: [
          {
            name: `<:st_website:830841154203025439> GuildInfo | ${guild.name}`,
            value: `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n<:st_owner:847812042467573761> **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n<:st_membros:845390325638889482> **Members:** \`${guild.memberCount} members\`\n<a:st_booster:830837674104979488> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Region:** \`${guild.region}\``
          }
        ]
      }]
    })
  }
}
