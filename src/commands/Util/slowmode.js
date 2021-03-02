module.exports = class SlowmodeCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_CHANNELS'], //Permissoes que o usuario necessita
				bot: ['MANAGE_CHANNELS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'slowmode',
				categoria: '🪓 • Util',
				desc: 'Altera o tempo do modo lento do canal atual.'
			},
			en: {
				nome: 'slowmode',
				categoria: '🪓 • Util',
				desc: 'Changes the slow mode time of the current channel.'
			},
			aliases: ['modolento'],
			run: this.run
		};
	}
	async run(client, message, args, prefixo, idioma) {
		if (args[0] && (args[0] > 21600 || args[0] < 0))
			return message.quote(
				`:x: ${message.author} **|** ${idioma.slowmode.time}`
			);
		if (!args[0]) {
			return message.quote(
				`:x: ${message.author} **|** ${idioma.slowmode.time}`
			);
		}
		if (isNaN(args[0]))
			return message.quote(
				`:x: ${message.author} **|** ${idioma.slowmode.NaN}`
			);
		message.channel
			.setRateLimitPerUser(Number(args[0]))
			.then(() => {
				message.quote(
					`:white_check_mark: ${
						message.author
					} **|** ${idioma.slowmode.lento.replace('%tempo', args[0])}`
				);
			})
			.catch(() => {
				message.quote(`:x: ${message.author} **|** ${idioma.slowmode.error}`);
			});
	}
};
//MrAndre, Davi e ADG