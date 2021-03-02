module.exports = (client) => {
	client.on('messageDelete', async (message) => {
		let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';
		let deletedmessage = message.content.slice(0,1000) 

        if(!message.content.slice(0,1000)){
        deletedmessage = '[FILE]'
        }

		idioma = client.lang[idioma];
		const embed = new (require('discord.js')).MessageEmbed()
			.setAuthor(
				`${idioma.editLogs.title} ${idioma.editLogs.deleted}`, 'https://media.discordapp.net/attachments/793835549667753984/802230763780309022/messagedelete.png')
			.setTimestamp()
			.setDescription(
				`**${idioma.editLogs.user}**: ${message.author}\n**${idioma.editLogs.canal}**: ${
					message.channel
				}\n**URL:** [${idioma.editLogs.click}](${message.url})`
			)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setColor('ff0000')
			.addField(idioma.editLogs.content, `${deletedmessage}`)

		if (message.author.bot) return;

		let logs = await client.db.get(`logs-${message.guild.id}`);
		if (logs) {
			let canal = await client.channels.cache.get(logs);
			canal.fetchWebhooks().then(hook => {
				let webhook = hook.first();

				if (!webhook) {
					const webhook = canal
						.createWebhook('Star (LOGS)', {
							avatar: client.user.displayAvatarURL({ dynamic: true }),
							reason: 'Logs'
						})
						.catch(err => {
							console.log(err);
						});

					webhook.send({
						username: client.user.username,
						avatarURL: client.user.displayAvatarURL({ dynamic: true }),
						embeds: [embed]
					});
				}

				if (webhook) {
					webhook.send({
						username: client.user.username,
						avatarURL: client.user.displayAvatarURL({ dynamic: true }),
						embeds: [embed]
					});
				}
			});
		}
	});
};
// ADG (logs) e Davi (multi idioma)