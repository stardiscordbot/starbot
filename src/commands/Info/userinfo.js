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
				nome: 'userinfo',
				categoria: '📖 • Info',
				desc: 'Veja todas as informações do usuário.'
			},
			en: {
				nome: 'userinfo',
				categoria: '📖 • Info',
				desc: 'See all user information.'
			},
			aliases: ['ui', 'whois'],
			run: this.run
		};
	}
	async run(client, message, args, prefixo, idioma) {
		const embed = new (require('discord.js')).MessageEmbed();
		let user;
		try {
			user = message.mentions.members.first() || (((args[0]&&!isNaN(args[0]))?await message.guild.members.cache.get(String(args[0])) : message.member))
			let member = user
			let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';
			let vazios = [, , , ,];
            let entradasSort = vazios.concat([...msg.guild.members.cache.values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)).concat(vazios)
            let membro = entradasSort.indexOf(member);
            
            let str = entradasSort.splice(membro - 3, membro + 4).filter(u => u).map(u => `${u.user.tag == member.user.tag ? `**${u.user.username}**` : u.user.username}`).slice(0, 7).join(' > ');
            let jn = msg.guild.members.cache.sort((a ,b) => a.joinedTimestamp - b.joinedTimestamp).array().indexOf(member)

			switch (idioma) {
				case 'pt':
					embed.setTitle(`${user.user.username}`);
					embed.addField(`🗣️ Tag no Discord:`, `**\`${user.user.tag}\`**`);
					embed.addField(`🔢 ID no Discord:`, `**\`${user.user.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Conta criada há:`,
						`${prettyMilliseconds(Date.now() - user.user.createdTimestamp, {
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
						`📆 Entrou aqui há:`,
						`${prettyMilliseconds(Date.now() - user.joinedTimestamp, {
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
						`📆 Ordem de entrada:`, `${str}`);
					embed.setThumbnail(
						user.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})
					);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Executado por: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
				case 'en':
					embed.setTitle(`${user.user.username}`);
					embed.addField(`🗣️ Discord Tag:`, `**\`${user.user.tag}\`**`);
					embed.addField(`🔢 Discord ID:`, `**\`${user.user.id}\`**`);
					embed.setTimestamp();
					embed.addField(
						`🕥 Account Created:`,
						`${prettyMilliseconds(Date.now() - user.user.createdTimestamp, {
							verbose: true
						})} **ago**.`
					);
					embed.addField(
						`📆 Joined here:`,
						`${prettyMilliseconds(Date.now() - user.joinedTimestamp, {
							verbose: true
						})} **ago**.`
					);
					embed.setThumbnail(
						user.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
							format: 'png'
						})
					);
					embed.addField(
						`📆 Entry order:`, `${str}`);

					embed.setColor(`GREEN`);

					embed.setFooter(
						`Used: ${message.author.tag}`,
						message.author.displayAvatarURL()
					);

					return message.quote(embed);
					break;
			}
		} catch (e) {
			return message.quote(
				`:x: ${message.author} **|** ${idioma.avatar.unknown}`
			);
		}
	}
};
//DAVI