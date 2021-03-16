const { Player } = require("discord-player");

module.exports = (client) => {

    client.player = new Player(client);

    client.player.on('trackStart', async (message, track) => {
    let idioma = await client.db.get(`idioma-${message.guild.id}`) || 'pt';	
	idioma = client.lang[idioma];
    message.channel.send(`Now playing \`${track.title.replace(/`/g, '')}\``)
    })

}