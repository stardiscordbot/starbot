module.exports = class WelcomeCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'welcome-message',
				categoria: '⚙️ • Config',
				desc: 'Define a mensagem de boas vindas do servidor.' 
			},
			en: {
				nome: 'welcome-message',
				categoria: '⚙️ • Config',
				desc: 'It defines the welcome message of the server. '
			},
			aliases: ['welcomemessage', 'joinmessage', 'joinmsg', 'welcomemsg', 'welcome-message', 'welmsg'],
			run: this.run
		};
	}

	async run(client, message, args, prefixoCerto, idioma) {

      if (!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.welmsg.noargs.replace('%p', prefixoCerto).replace('%g', message.guild.name).replace('%use', message.author.username).replace('%author', message.author).replace('%mc', message.guild.memberCount).replace('%ut', message.author.tag).replace('%id', message.author.id)}`);

		if(args[0].toLowerCase() === 'desativar' || args[0].toLowerCase() === 'disable' || args[0].toLowerCase() == 'desligar' || args[0].toLowerCase() === 'off') {
			await client.db.delete(`welmsg-${message.guild.id}`).catch(e => {
				console.log("[DELETE] Não exite dados")
			});;
            await client.db.delete(`welcome-${message.guild.id}`).catch(e => {
				console.log("[DELETE] Não exite dados")
			});;
			return message.quote(
				`:white_check_mark: ${
					message.author
				} **|** ${idioma.welcome.disabled}`
			);
		}
	}
  }