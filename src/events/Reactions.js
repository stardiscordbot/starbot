module.exports = (client) => {
    client.on('messageReactionAdd', async (r) => {
        if(r.message.author.id == client.user.id) return;
        let idioma = (await client.db.get(`idioma-${r.message.guild.id}`)) || 'pt';
        if(r.partial) await r.fetch()

        const conteudo = r.message.content
        //r.message.reactions.forEach((reaction) => {});
        const eURL = {};
        const embeds = r.message.embeds;
        const msgChannel = client.channels.forge(r.message.channel.id);
        const starchannel = await client.db.get(`starboard-${r.message.guild.id}`);
        const starboard = await client.channels.forge(starchannel);
        const attachments = r.message.attachments;
        const tt = '⭐';

        idioma = client.lang[idioma];
        if (embeds.length > 0) {
            if(embeds[0].thumbnail && embeds[0].thumbnail.url)
              eURL.i = embeds[0].thumbnail.url;
            else if(embeds[0].image && embeds[0].image.url)
              eURL.i = embeds[0].image.url;
            else
              eURL.i = embeds[0].url;

          } else if (attachments.array().length > 0) {
            const attARR = attachments.array();
            eURL.i = attARR[0].url;
        }

        if(r.emoji.name !== tt) return;
        if(r.emoji.name == tt) {
            const starembed = new (require("discord.js-light")).MessageEmbed()
            .setAuthor(`${r.message.author.tag} (${r.message.author.id})`, r.message.author.displayAvatarURL({dynamic:true}))
            .addField(`${idioma.starboard.cont}`, conteudo)
            .setColor("YELLOW")
            .setImage(eURL.i);
            if(r.count >= 5) return starboard.send(starembed)
        }
    })
}