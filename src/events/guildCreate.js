const webhook = require("../config/json/webhooks.json")

const create = new (require("discord.js")).WebhookClient(webhook.gcreate.id, webhook.gcreate.token)
module.exports = (client) => {
    client.on("guildCreate", async guild => {

        const dono = await client.users.fetch(guild.ownerID)

        if(guild.region !== "brazil") {
            client.db.set(`idioma-${guild.id}`, `en`)
        }

        const embed = new (require("discord.js")).MessageEmbed()
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
        .addField(`Dono:`, `\`${dono.tag} (${dono.id})\``)
        .addField(`Membros:`, `\`${guild.memberCount}\``)
        .addField(`Região:`, `\`${guild.region}\``)
        .setColor("YELLOW")

        create.send({
            username: client.user.username,
            avatarURL: client.user.displayAvatarURL({ dynamic: true }),
            embeds: [embed]
        });
    })
}