module.exports = class guildBanAdd {
  constructor () {
    return {
      nome: 'guildBanAdd',
      run: this.run
    }
  }

  async run (guild, user) {
    const {
      Constants
    } = require('eris')
    const fetchedLogs = await guild.getAuditLogs({
      limit: 1,
      type: Constants.AuditLogActions.MEMBER_BAN_ADD
    })

    if (!fetchedLogs) return star.getRESTChannel('829534916765155358').createMessage(`[BAN] **${user.tag} (${user.id})** foi banido mais não achei o autor.`)

    const logs = await global.db.get(`logs-${guild.id}`)
    if (!logs) return
    const canal = await star.getRESTChannel(logs)

    const embed = new global.star.manager.Ebl()
    embed.title('<:st_tools:846423174686310473> Event Log | Ban')
    embed.field('🛠️ Member Banned:', `\`\`\`${user.username}#${user.discriminator} (${user.id})\`\`\``)
    embed.field('🛠️ Banned By:', `\`\`\`${fetchedLogs.user.username}#${fetchedLogs.user.discriminator} (${fetchedLogs.user.id})\`\`\``)
    embed.thumbnail(user.avatarURL || star.user.avatarURL)
    embed.color('#dd3af0')
    canal.createMessage(embed.create)
  }
}
