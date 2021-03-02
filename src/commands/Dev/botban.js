module.exports = class ExemploCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'botban',
				categoria: '💻 • Testes',
				desc: 'Descrição'
			},
			en: {
				nome: 'botban',
				categoria: '💻 • Developer',
				desc: 'Description'
			},
			aliases: ['bl', 'starban', 'blacklist'],
			run: this.run
		};
	}

	async run(client, message, args) {

		if (!args[0] || !args[1])
			return message.quote(`\`s.botban <adicionar/remover> <@Usuário | ID>\``);
		let usuario =
			message.mentions.users.first() ||
			(await client.users.fetch(String(args[1])));

		var msg = message;
		switch (args[0]) {
			case 'adicionar':
				await client.db.push(`blacklist`, usuario.id);

				return message.quote(
					`:white_check_mark: ${message.author} **|** O usuário \`${
						usuario.username
					}\` foi proibido de usar o bot.`
				);
				break;
			case 'remover':
				await client.db.pull(`blacklist`, usuario.id);

				return message.quote(
					`:white_check_mark: ${message.author} **|** O usuário \`${
						usuario.username
					}\` agora pode usar o bot novamente.`
				);
				break;
		}
	}
};

// ADG e Davi
