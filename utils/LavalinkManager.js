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

        send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        },
        
        

    })

    .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
    .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
    .on("trackStart", async (player, track) => {
    
    const channel = client.channels.cache.get(player.textChannel);

    let idioma = await client.db.get(`idioma-${channel.guild.id}`) || 'pt';
		
	idioma = client.lang[idioma];

    const npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.erela.np} \`${track.title}\``)
    .setColor("F47FFF")

    client.channels.cache
      .get(player.textChannel)
      .send(npembed);
    
    })
    .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();

  });
    

}