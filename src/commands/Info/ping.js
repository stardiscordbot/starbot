module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ping',
				categoria: '📖 • Info',
				desc: 'Veja a latência do bot'
			},
			en: {
				nome: 'ping',
				categoria: '📖 • Info',
				desc: 'See bot latency'
			},
			aliases: ['latency', 'ws', 'pong'],
			run: this.run
		};
	}

	async run(client, message, args, prefixo) {
		return message.quote(
				`🏓 **|** ${message.author} Pong!\n- **Websocket Ping:** \`${
					client.ws.ping
				}ms\`\n- **API Ping:** \`${Date.now() - message.createdTimestamp}ms\``
			)
	}
};

//ADG e Davi