module.exports = async (client) => {
    const {Player} = require("discord-player");

    const player = new Player(client);

    client.player = player;

    client.player
    
    .on('trackStart', async (message, track) => {
        let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
        idioma = client.lang[idioma];
        let npembed = new (require("discord.js")).MessageEmbed()
        .setDescription(`${idioma.player.np} \`${track.title.replace(/`/g, '')}\``)
        .setColor("F47FFF")

        message.channel.send(npembed)
    })

.on('trackAdd', async (message, queue, track) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.play.add} \`${track.title.replace(/`/g, '')}\``)
    .setColor("F47FFF")

    message.channel.send(npembed)
})
.on('playlistAdd', async (message, queue, playlist) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.play.add} \`${playlist.title.replace(/`/g, '')} (${playlist.tracks.length})\``)
    .setColor("F47FFF")

    message.channel.send(npembed)
})
/*
.on('searchResults', (message, query, tracks) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Here are your search results for ${query}!`)
    .setDescription(tracks.map((t, i) => `${i}. ${t.title}`))
    .setFooter('Send the number of the song you want to play!')
    message.channel.send(embed);

})

.on('searchInvalidResponse', (message, query, tracks, content, collector) => {

    if (content === 'cancel') {
        collector.stop()
        return message.channel.send('Search cancelled!')
    }

    message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`)

})

.on('searchCancel', (message, query, tracks) => {
    message.channel.send('You did not provide a valid response... Please send the command again!')
})
*/

.on('noResults', async (message, query) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.player.noresults} \`${query.replace(/`/g, '')}\``)
    .setColor("F47FFF")

    message.channel.send(npembed)
})

.on('queueEnd', async (message, queue) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.player.end}`)
    .setColor("F47FFF")

    message.channel.send(npembed)
})

.on('channelEmpty', async (message, queue) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.player.solo}`)
    .setColor("F47FFF")

    message.channel.send(npembed)
})

.on('botDisconnect', async (message) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    let npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.player.dis}`)
    .setColor("F47FFF")

    message.channel.send(npembed)
})

.on('error', async (error, message) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';
		
    idioma = client.lang[idioma];
    switch(error){
        default:
            message.reply(`deu ruim.\n\`\`\`js\n${error}\n\`\`\``)
    }
})

}