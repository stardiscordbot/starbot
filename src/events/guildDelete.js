const webhook = require("../config/json/webhooks.json")

const create = new (require("discord.js")).WebhookClient(webhook.gdelete.id, webhook.gdelete.token)
module.exports = (client) => {
    client.on("guildDelete", async guild => {

        const dono = await client.users.fetch(guild.ownerID)
        
        client.db.delete(`idioma-${guild.id}`).catch((e) => {
            console.log(`${guild.id} | No Idioma`)
        })
        client.db.delete(`logs-${guild.id}`).catch((e) => {
            console.log(`${guild.id} | No Logs`)
        });
        client.db.delete(`leave-${guild.id}`).catch((e) => {
            console.log(`${guild.id} | No Leave`)
        });
        client.db.delete(`welcome-${guild.id}`).catch((e) => {
            console.log(`${guild.id} | No Welcome`)
        });
        client.db.delete(`autorole-${guild.id}`).catch((e) => {
            console.log(`${guild.id} | No Autorole`)
        });

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