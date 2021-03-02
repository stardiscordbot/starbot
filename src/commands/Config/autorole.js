module.exports = class AutoRoleCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: ['MANAGE_ROLES'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'autorole',
				categoria: '⚙️ • Config',
				desc: 'Define um cargo automático que membros que entrarem irão ganhar.' 
			},
			en: {
				nome: 'autorole',
				categoria: '⚙️ • Config',
				desc: 'Define an automatic role that members who join the server will get. '
			},
			aliases: ['auto-role', 'auto-cargo', 'autocargo'],
			run: this.run
		};
	}

	async run(client, message, args, prefixoCerto, idioma) {
		let role =
			message.mentions.roles.first() ||
			message.guild.roles.cache.get(String(args[0]));

		if (!args[0])
			return message.quote(
				`:x: ${
					message.author
				} **|** ${idioma.autoRole.insertRole.replace('%p', prefixoCerto)}`
			);

		if(args[0].toLowerCase() === 'desativar' || args[0].toLowerCase() === 'disable') {
			await client.db.delete(`autorole-${message.guild.id}`);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.autoRole.disabled}`
			);
		} else {
			if (!role) return message.quote(
				`:x: ${
					message.author
				} **|** ${idioma.autoRole.insertRole.replace('%p', prefixoCerto)}`
			);

			await client.db.set(`autorole-${message.guild.id}`, role.id);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.autoRole.success.replace('%cargo', role.name)}`);
		}
	}
};

//ADG e Davi