const player = require("../src/config/json/player.json")
const { Manager } = require("erela.js");

module.exports = (client) => {

    client.manager = new Manager({
        nodes: [
            {
                host: player.host,
                port: player.port,
                password: player.pass
            },
        ],
        autoPlay: true,
        send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        },

    })

    .on("nodeConnect", node => console.log(`[LAVALINK] Node "${node.options.identifier}" connected`))
    .on("nodeError", (node, error) => console.log(`[LAVALINK] Node "${node.options.identifier}" had an error: ${error.message}`))
    
    .on("playerMove", (player, currentChannel, newChannel) => {
      player.voiceChannel = client.channels.cache.get(newChannel);
    })
    .on("trackStart", async (player, track) => {
    
    const channel = client.channels.cache.get(player.textChannel);

    let idioma = await client.db.get(`idioma-${channel.guild.id}`) || 'pt';
		
	  idioma = client.lang[idioma];

    const npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.erela.np} \`${track.title}\` | \`${track.requester.tag}\``)
    .setColor("F47FFF")

    client.channels.cache
      .get(player.textChannel)
      .send(npembed);
    
    })
    
    .on("queueEnd", async (player) => {

      const channel = client.channels.cache.get(player.textChannel);

      let idioma = await client.db.get(`idioma-${channel.guild.id}`) || 'pt';
      
      idioma = client.lang[idioma];

      const endembed = new (require("discord.js")).MessageEmbed()
      .setDescription(`${idioma.erela.end}`)
      .setColor("F47FFF")

    client.channels.cache
      .get(player.textChannel)
      .send(endembed);

    player.destroy();

  });
    

}