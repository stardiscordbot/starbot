module.exports = class AutoRoleCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: ['MANAGE_WEBHOOKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'logs',
				categoria: '⚙️ • Config',
				desc: 'Define um canal para receber as logs do servidor.'
			},
			en: {
				nome: 'logs',
				categoria: '⚙️ • Config',
				desc: 'Set a channel to receive the server logs.'
			},
			aliases: ['serverlogs', 'messagelog', 'meblogs', 'guildlogs'],
			run: this.run
		};
	}

	async run(client, message, args, prefixoCerto, idioma) {
		let logs =
			message.mentions.channels.first() ||
			message.guild.channels.cache.get(String(args[0]));
		if (
			args[0] &&
			(args[0].toLowerCase() === 'desativar' ||
				args[0].toLowerCase() === 'disable')
		) {
			await client.db.delete(`logs-${message.guild.id}`);
			return message.quote(
				`:white_check_mark: ${message.author} **|** ${
					idioma.guildLogs.disabled
				}`
			);
		}
		if (!args[0])
			return message.quote(
				`:x: ${message.author} **|** ${idioma.guildLogs.insertChannel.replace(
					'%p',
					prefixoCerto
				)}`
			);

		if (!logs)
			return message.quote(
				`:x: ${message.author} **|** ${idioma.guildLogs.insertChannel.replace(
					'%p',
					prefixoCerto
				)}`
			);

		await client.db.set(`logs-${message.guild.id}`, logs.id);

		return message.quote(
			`:white_check_mark: ${
				message.author
			} **|** ${idioma.guildLogs.success.replace('%canal', logs.name)}`
		);

		logs
			.createWebhook('Star (LOGS)', {
				avatar: client.user.displayAvatarURL({ dynamic: true }),
				reason: 'LogsHook'
			})
			.catch(err => {
				console.log(err);
			});
	}
};

//ADG
