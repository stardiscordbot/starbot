const { Manager } = require("erela.js");
const { MessageEmbed } = require("discord.js-light")

module.exports = (client) => {

  client.music = new Manager({
    nodes: [{ host: "207.244.250.184", password: 'evecloud', port: 9002, identifier: "star", retryDelay: 5000 }],
    autoPlay: true,
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  })

  .on('nodeError', (node, error) => console.log(`[NODE] - ${node.options.identifier} error: ${error.message}`.red))
	.on('nodeConnect', node => console.log(`[NODE] - ${node.options.identifier} conectado`.green))

	.on('trackStart', (player, track, payload) => {
		const channel = client.channels.cache.get(player.textChannel);
		let embed = new MessageEmbed()
		embed.setDescription(`**Tocando agora** \`${track.title}\``)
		embed.setTimestamp()
		embed.setColor(client.channels.cache.get(player.textChannel).guild.me.roles.highest.color || client.settings.color)
		embed.setFooter(`Solicitado por ${track.requester.tag}`, track.requester.displayAvatarURL({ dynamic: true, size: 2048 }))
		channel.send(embed).then(msg => player.set("message", msg));
	})

	.on("trackEnd", (player, track, payload) => {
		if(player.get("message") && !player.get("message").deleted) player.get("message").delete();
	})

	.on('playerMove', (player, currentChannel, newChannel) => {
		player.voiceChannel = client.channels.cache.get(newChannel);
	})

	.on('socketClosed', (player, payload) => {
		if (payload.byRemote) {
			return player.destroy()
		}
	})

	.on("trackError", (player, track, payload) => {
		if (payload.type === 'TrackExceptionEvent') {
			let channel = client.channels.cache.get(player.textChannel)
			channel.send(`Um erro aconteceu desculpa: ${payload.error}`)
		}
	})

	.on("trackStuck", (player, track, payload) => {
		if (payload.type === 'TrackExceptionEvent') {
			let channel = client.channels.cache.get(player.textChannel)
			channel.send(`Um erro desconhecido ocorreu: ${payload.error}`)
		}
	})

	.on("queueEnd", player => {
		const channel = client.channels.cache.get(player.textChannel);
        channel.send('Saindo do canal de voz. . .');
        player.destroy()
	});
	
}