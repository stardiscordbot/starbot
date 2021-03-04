module.exports = class WelcomeCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'leave',
				categoria: '⚙️ • Config',
				desc: 'Define o canal de saída do servidor.' 
			},
			en: {
				nome: 'leave',
				categoria: '⚙️ • Config',
				desc: 'It defines the leavd channel of the server. '
			},
			aliases: ['leavechannel', 'leaveconfig', 'leftchannel', 'goodbye'],
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
				} **|** ${idioma.leave.insertChannel.replace('%p', prefixoCerto)}`
			);

		if(args[0].toLowerCase() === 'desativar' || args[0].toLowerCase() === 'disable') {
			await client.db.delete(`leave-${message.guild.id}`);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.leave.disabled}`
			);
		} else {
			if (!canal) return message.quote(
				`:x: ${
					message.author
				} **|** ${idioma.leave.insertChannel.replace('%p', prefixoCerto)}`
			);

			await client.db.set(`leave-${message.guild.id}`, canal.id);
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.leave.success.replace('%canal', canal.name)}`);
		}
	}
  }