module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'guildBanRemove',
            run: this.run
        }
    }
    async run(guild) {
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE',
        });

        const banLog = fetchedLogs.entries.first();
        const { executor, target } = banLog;

        const user = await star.getRESTUser(target.id)

        let logs = await db.get(`logs-${guildID}`)
        if(!logs) return;
        let canal = await star.channels.forge(logs);

        const embed = new star.manager.ebl;
        embed.title(`<:st_tools:846423174686310473> Event Log | UnBan`)
        embed.field(`🛠️ Member Unbanned:`, `\`\`\`${user.username}#${user.discriminator} (${user.id})\`\`\``)
        embed.field('🛠️ Unbanned by:', `\`\`\`${executor.tag} (${executor.id})\`\`\``)
        embed.thumbnail(user.displayAvatarURL({dynamic:true, size: 4096}))
        embed.color('#dd3af0')

        canal.fetchWebhooks().then(hook => {
            if (!webhook) {
                const webhook = canal
                    .createWebhook('Star (LOGS)', {
                        avatar: star.user.displayAvatarURL({ dynamic: true }),
                        reason: 'Star | Logs'
                    })
                    .catch(err => {
                        console.log(err);
                    });

                webhook.send({
                    username: star.user.username,
                    avatarURL: star.user.displayAvatarURL({ dynamic: true }),
                    embeds: [embed.create]
                });
            }

            if (webhook) {
                webhook.send({
                    username: star.user.username,
                    avatarURL: star.user.displayAvatarURL({ dynamic: true }),
                    embeds: [embed.create]
                });
            }
        })

    }
}