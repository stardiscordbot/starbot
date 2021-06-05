module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'guildBanAdd',
            run: this.run
        }
    }
    async run(guild) {
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });

        const banLog = fetchedLogs.entries.first();
        const { executor, target } = banLog;

        const user = await star.getRESTUser(target.id)

        if (!banLog) return star.channels.fetch("829534916765155358").send(`[BAN] **${user.tag} (${user.id})** foi banido mais não achei o autor.`);

        let logs = await db.get(`logs-${guildID}`)
        if(!logs) return;
        let canal = await star.channels.forge(logs);

        const embed = new star.manager.ebl;
        embed.title(`<:st_tools:846423174686310473> Event Log | Ban`)
        embed.field(`🛠️ Member Banned:`, `\`\`\`${user.username}#${user.discriminator} (${user.id})\`\`\``)
        embed.field('🛠️ Banned By:', `\`\`\`${executor.tag} (${executor.id})\`\`\``)
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