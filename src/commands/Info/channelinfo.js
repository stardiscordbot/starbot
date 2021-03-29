const prettyMilliseconds = require('pretty-ms');

module.exports = class UserInfoCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'channelinfo',
				categoria: '📖 • Info',
				desc: 'Veja todas as informações do canal do Servidor.'
			},
			en: {
				nome: 'channelinfo',
				categoria: '📖 • Info',
				desc: 'See all the information of the Server channel.'
			},
			aliases: ['ci'],
			run: this.run
		};
	}
	async run(client, message, args, prefixo, idioma) {
		const embed = new (require('discord.js-light')).MessageEmbed();
		const msg = message;
		let canal;
		try {
			canal = message.mentions.channels.first() || (((args[0]&&!isNaN(args[0]))? message.guild.channels.cache.get(String(args[0])) : message.channel))
			let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';

			switch (idioma) {
				case 'pt':
					embed.setTitle(`${canal.guild.name}`);
					embed.addField(`⌨️ Nome do Canal:`, `**\`${canal.name}\`**`);
					embed.addField(`🔢 ID do Canal:`, `**\`${canal.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Canal criado há:`,
						`${prettyMilliseconds(Date.now() - canal.createdTimestamp, {
							verbose: true
						})
							.replace('day', 'dia')
							.replace('minute', 'minuto')
							.replace('second', 'segundo')
							.replace('week', 'semana')
							.replace('year', 'ano')
							.replace('hour', 'hora')}`
					);
					embed.addField(
						`📖 Tópico:`,
						`${canal.topic||'Desconhecido.'}`
					);
					embed.setThumbnail(
						message.guild.iconURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})||null
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Executado por: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
				case "en":
                    embed.setTitle(`${canal.guild.name}`);
					embed.addField(`⌨️ Channel Name:`, `**\`${canal.name}\`**`);
					embed.addField(`🔢 Channel ID:`, `**\`${canal.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Channel created ago:`,
						`${prettyMilliseconds(Date.now() - canal.createdTimestamp, {
							verbose: true
						})
							.replace('day', 'day(s)')
							.replace('minute', 'minute(s)')
							.replace('second', 'second(s)')
							.replace('week', 'week(s)')
							.replace('year', 'year(s)')
							.replace('hour', 'hour(s)')}`
					);
					embed.addField(
						`📖 Topics:`,
						`${canal.topic||'Unknown.'}`
					);
					embed.setThumbnail(
						message.guild.iconURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})||null
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Run by: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
                    break;
			}
		} catch (e) {
		  console.log(e)
			return message.quote(
				`:x: ${message.author} **|** ${idioma.avatar.unknown}`
			);
		}
	}
};
//ADG