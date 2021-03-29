module.exports = (client) => {
	client.on('messageUpdate', async (oldMessage, newMessage) => {
		let idioma = (await client.db.get(`idioma-${newMessage.guild.id}`)) || 'pt';
		if(!oldMessage||(oldMessage&&!oldMessage.content)) return;
		if(newMessage.content===oldMessage.content) return

        let messageantiga = oldMessage.content.slice(0,1000)
        let messagenova = newMessage.content.slice(0,1000)
        
        if(!oldMessage.content.slice(0,1000)){
        messageantiga = '[FILE]'
        }

        if(!newMessage.content.slice(0,1000)){
        messagenova = '[EMBED]'
        }

		idioma = client.lang[idioma];
		const embed = new (require('discord.js-light')).MessageEmbed()
	  	.setAuthor(`${idioma.editLogs.title} ${idioma.editLogs.edited}`, 'https://media.discordapp.net/attachments/798587400871870507/801897320370667520/messageupdate.png')
			.setTimestamp()
			.setDescription(
				`**${idioma.editLogs.user}**: ${oldMessage.author}\n**${idioma.editLogs.canal}**: ${
					oldMessage.channel
				}\n**URL:** [${idioma.editLogs.click}](${newMessage.url})`
			)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setColor('YELLOW')
			.addField(idioma.editLogs.old, `${messageantiga}`)
			.addField(idioma.editLogs.new, `${messagenova}`);

		if (newMessage.author.bot) return;

		let logs = await client.db.get(`logs-${oldMessage.guild.id}`);
		if (logs) {
			let canal = await client.channels.forge(logs);
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