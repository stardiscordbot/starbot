module.exports = (client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        const player = client.manager.players.get(newState.guild.id)
    
        if(!player) return;
    
        const channel = client.channels.cache.get(player.textChannel)

        let idioma = await client.db.get(`idioma-${channel.guild.id}`) || 'pt';
		
        idioma = client.lang[idioma];
    
        let canal = player.options.voiceChannel;
    
        let guilda = player.options.guild;
        
        const embed = new (require("discord.js")).MessageEmbed()
        .setDescription(idioma.erela.solo)
        .setColor("F47FFF")

        if(client.guilds.cache.get(guilda).channels.cache.get(canal).members.size == 1) {
            channel.send(embed) 
            return player.destroy()
        }
    })
}