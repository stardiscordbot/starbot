const player = require("../src/config/json/player.json")

const {Manager} = require("erela.js");
const Deezer  = require("erela.js-deezer");
const Spotify  = require("erela.js-spotify");

const clientID = player.plugins.spotify.id;
const clientSecret = player.plugins.spotify.secret;

const c = require("colors");

module.exports = (client) => {

    client.manager = new Manager({
        nodes: [
            {
                host: player.lavalink.host,
                port: player.lavalink.port,
                password: player.lavalink.pass,
                identifier: "PANAM"
            },
        ],
        plugins: [
          new Spotify({
            clientID,
            clientSecret
          }),
          new Deezer()
        ],

        autoPlay: true,

        send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        },

    })

    .on("nodeConnect", node => console.log(c.blue(`[LAVALINK] Node "${node.options.identifier}" connected`)))
    .on("nodeError", (node, error) => console.log(c.red(`[LAVALINK] Node "${node.options.identifier}" had an error: ${error.message}`)))
    
    .on("playerMove", (player, currentChannel, newChannel) => {
      player.voiceChannel = client.channels.cache.get(newChannel);
    })
    .on("trackStart", async (player, track) => {
    
    const channel = client.channels.cache.get(player.textChannel);

    let idioma = await client.db.get(`idioma-${channel.guild.id}`) || 'pt';
		
	  idioma = client.lang[idioma];

    const npembed = new (require("discord.js")).MessageEmbed()
    .setDescription(`${idioma.erela.np} \`${track.title.replace(/`/g, '')}\` | \`${track.requester.tag}\``)
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