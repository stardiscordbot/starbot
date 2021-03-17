module.exports = class AutoRoleCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'set-sugestao',
				categoria: '⚙️ • Config',
				desc: 'Define um canal para receber as sugestões do servidor'
			},
			en: {
				nome: 'set-suggestion',
				categoria: '⚙️ • Config',
				desc: 'Defines a channel to receive suggestions from the server'
			},
			aliases: ['set-sugestao', 'set-suggestion', 's-s', 's-sugestao', 's-suggestion'],
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
			await client.db.delete(`sugestao-${message.guild.id}`);
			return message.quote(
				`:white_check_mark: ${message.author} **|** ${
					idioma.sugestao.disabled
				}`
			);
		}
		if (!args[0])
			return message.quote(
				`:x: ${message.author} **|** ${idioma.sugestao.insertChannel.replace(
					'%p',
					prefixoCerto
				)}`
			);

		if (!logs)
			return message.quote(
				`:x: ${message.author} **|** ${idioma.sugestao.insertChannel.replace(
					'%p',
					prefixoCerto
				)}`
			);

		await client.db.set(`sugestao-${message.guild.id}`, logs.id);

		return message.quote(
			`:white_check_mark: ${
				message.author
			} **|** ${idioma.sugestao.success.replace('%canal', logs.name)}`
		);
	}
};

//ADG
