module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: true
        },
        pt: {
          nome: 'guilds',
          categoria: '💻 • Desenvolvedor',
          desc: 'Recarrega o bot'
        },
        en: {
          nome: 'guilds',
          categoria: '💻 • Developer',
          desc: 'Reload bot'
        },
        aliases: ['servidores', 'guildsinfo'],
        run: this.run
      }
    }
    async run(ctx) {
        const StarEmbedPages = require("../../client/StarEmbedPages");
        const moment = require("moment");
        const embeds = []
        let total = 0
        
        star.guilds.cache.map(guild => {
            //let owner = await star.getRESTUser(guild.ownerID)
            let embed = new star.manager.ebl;
            embed.title(`<:st_discord:847806904808898600> ${guild.name}`)
            embed.color('#dd3af0')
            embed.field(`❯ General Info:`, `🧭 **ID:** \`${guildID} [${guild.shardID}]\`\n<:st_membros:845390325638889482> **Members:** \`${guild.memberCount} members\`\n<a:st_booster:830837674104979488> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('DD/MM/YY')}\`\n🗺️ **Region:** \`${guild.region}\``, true)
            embed.thumbnail(guild.iconURL() || "https://i.imgur.com/2dwGomm.png")
            embeds.push(embed)
            total = total + 1
        })

        const emojiList = ["◀️", "▶️"]
        StarEmbedPages(ctx, embeds, emojiList, 60000);
  }
}
  
  // LRD