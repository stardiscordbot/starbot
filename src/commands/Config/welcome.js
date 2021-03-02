module.exports = class WelcomeCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'welcome',
				categoria: '⚙️ • Config',
				desc: 'Define o canal de boas vindas do servidor.' 
			},
			en: {
				nome: 'welcome',
				categoria: '⚙️ • Config',
				desc: 'It defines the welcome channel of the server. '
			},
			aliases: ['welcomechannel', 'welcomeconfig', 'joinchannel'],
			run: this.run
		};
	}

	async run(client, message, args, prefixoCerto, idioma) {

    let canal =
			message.mentions.channels.first() ||
			message.guild.channels.cache.get(String(args[0]));

      if (!args[0])
			return message.quote(
				`:x: ${
					message.author
				} **|** ${idioma.welcome.insertChannel.replace('%p', prefixoCerto)}`
			);

		if(args[0].toLowerCase() === 'desativar' || args[0].toLowerCase() === 'disable') {
			await client.db.delete(`welcome-${message.guild.id}`);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.welcome.disabled}`
			);
		} else {
			if (!canal) return message.quote(
				`:x: ${
					message.author
				} **|** ${idioma.welcome.insertChannel.replace('%p', prefixoCerto)}`
			);

			await client.db.set(`welcome-${message.guild.id}`, canal.id);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.welcome.success.replace('%canal', canal.name)}`);
		}
	}
  }