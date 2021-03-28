module.exports = class AutoRoleCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'set-starboard',
				categoria: '⚙️ • Config',
				desc: 'Define um canal para receber o starboard do servidor'
			},
			en: {
				nome: 'set-starboard',
				categoria: '⚙️ • Config',
				desc: 'Defines a channel to receive the starboard from the server'
			},
			aliases: ['set-starboard', 'set-top', 's-star', 's-stars', 's-tops', 'starboard'],
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
		await client.db.delete(`starboard-${message.guild.id}`);
		return message.quote(
			`:white_check_mark: ${message.author} **|** ${
				idioma.starboards.disabled
			}`
		);
	}
	if (!args[0])
		return message.quote(
			`:x: ${message.author} **|** ${idioma.starboards.insertChannel.replace(
				'%p',
				prefixoCerto
			)}`
		);

	if (!logs)
		return message.quote(
			`:x: ${message.author} **|** ${idioma.starboards.insertChannel.replace(
				'%p',
				prefixoCerto
			)}`
		);

	await client.db.set(`starboard-${message.guild.id}`, logs.id);

	return message.quote(
		`:white_check_mark: ${
			message.author
		} **|** ${idioma.starboards.success.replace('%canal', logs.name)}`
	);
	}
};

//ADG