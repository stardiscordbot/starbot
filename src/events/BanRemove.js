module.exports = class guildBanRemove {
    constructor() {
        return {
            nome: 'guildBanRemove',
            run: this.run
        }
    }
    async run(guild, user) {
        const {
            Constants
        } = require("eris")
        const fetchedLogs = await guild.getAuditLogs({
            limit: 1,
            type: Constants.AuditLogActions.MEMBER_BAN_REMOVE,
        });

        if (!fetchedLogs) return star.getRESTChannel("829534916765155358").createMessage(`[BAN] **${user.tag} (${user.id})** foi banido mais não achei o autor.`);

        let logs = await db.get(`logs-${guild.id}`)
        if (!logs) return;
        let canal = await star.getRESTChannel(logs);

        const embed = new star.manager.ebl;
        embed.title(`<:st_tools:846423174686310473> Event Log | Unban`)
        embed.field(`🛠️ Member Unbanned:`, `\`\`\`${user.username}#${user.discriminator} (${user.id})\`\`\``)
        embed.field('🛠️ Unbanned By:', `\`\`\`${fetchedLogs.user.username}#${fetchedLogs.user.discriminator} (${fetchedLogs.user.id})\`\`\``)
        embed.thumbnail(user.avatarURL || star.user.avatarURL)
        embed.color('#dd3af0')
        canal.createMessage(embed.create)

    }
}