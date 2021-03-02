module.exports = class AutoRoleCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'idioma',
				categoria: '⚙️ • Config',
				desc: 'Altera o idioma do bot.'
			},
			en: {
				nome: 'language',
				categoria: '⚙️ • Config',
				desc: 'Changes the bot language.'
			},
			aliases: ['idoma', 'lang', 'setlang', 'guildlang'],
			run: this.run
		};
	}

	async run(client, message, args, prefixoCerto, idioma) {
		if(!args[0]) {
		  return message.channel.send(`:x: ${message.author} **|** ${idioma.multiLang.insertLang.replace('%p', prefixoCerto)}`)
		} else { 
		  switch(args[0].toLowerCase()) {
		    case 'pt':
		    case 'portugues':
		    case 'br':
		    case 'português':
		      client.db.delete(`idioma-${message.guild.id}`)
		      message.channel.send(`:white_check_mark: ${message.author} **|** Idioma alterado com sucesso.`)
		      break;
		    case 'en':
		    case 'ingles':
		    case 'inglês':
		    case 'english':
		      client.db.set(`idioma-${message.guild.id}`, `en`)
		      message.channel.send(`:white_check_mark: ${message.author} **|** Language changed successfully.`)
		      break;
		    default:
		      message.channel.send(`:x: ${message.author} **|** ${idioma.multiLang.unknownLanguage}`)
		  }
		}
	}
};

// Davi