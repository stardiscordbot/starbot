module.exports = class GuildCreate {
    constructor() {
        return {
            nome: 'guildCreate',
            run: this.run
        }
    }
    async run(guild) {
        const ch = await star.getRESTChannel("848955667866976276")
        ch.edit({
            name: `🧭 → Servers [${star.guilds.size}]`
        })

        const moment = require("moment")

        const log = await star.getRESTChannel("829530462354538566")
        const owner = await star.getRESTUser(guild.ownerID)

        if (guild.region !== "brazil") {
            await db.set(`idioma-${guild.id}`, "en-us")
        }

        const embed = new star.manager.ebl;
        embed.title(`<:st_util_info:835532528617259068> GuildCreate | ${star.user.username}`)
        embed.description('<:st_random_pato:830842917790810183> Fui adicionada em um servidor, yeah!')
        embed.field(`<:st_website:830841154203025439> GuildInfo | ${guild.name}`, `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n<:st_owner:847812042467573761> **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n<:st_membros:845390325638889482> **Members:** \`${guild.memberCount} members\`\n<a:st_booster:830837674104979488> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Region:** \`${guild.region}\``)
        embed.color('#dd3af0')
        embed.thumbnail(guild.iconURL || "https://i.imgur.com/2dwGomm.png")
        log.createMessage(embed.create)

    }
}