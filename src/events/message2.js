function regexEscapar(prefixo) {
	return prefixo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const { verificaVotos } = require("votos-zuraaa");
const votelog = require("../config/json/botlist.json")

const prefixos = new RegExp(
	`^(<@!?768923396465360938>|${regexEscapar('s!')}|${regexEscapar(
		's.'
	)}|star)\\s*`
); // menção, star, s. e s! serao prefixos

const webhookClient = new (require("discord.js")).WebhookClient(votelog.votehook.id, votelog.votehook.token);

module.exports = (client) => {
	client.on('messageUpdate', async (oldMessage, newMessage, message) => {
        if(newMessage.content===oldMessage.content) return;

		var msg = message;
        var nMsg = newMessage;

		if(newMessage.author.bot) return;

		let regexMention = new RegExp(`^<@!?${client.user.id}>$`);

		require('../../utils/quote');
		let idioma = (await client.db.get(`idioma-${newMessage.guild.id}`)) || 'pt';
		
		idioma = client.lang[idioma];

		verificarPing();
		verificarComando();
		function verificarPing() {
			if (newMessage.content.match(regexMention))
				return msg.quote(idioma.mention.response.replace('%u', msg.author.username));
		}

		async function verificarComando() {
		  let botban = await client.db.get(`blacklist`)
			//Verificar se a mensagem tem algum dos prefixos da regex

      if(!botban) {
        client.db.push(`blacklist`, client.user.id);
      }

			if(botban.includes(newMessage.author.id)) return;
			if (!prefixos.test(newMessage.content.toLowerCase())) return;

			//Procurar prefixo usado na mensagem com regex
			let [, prefixoCerto] = newMessage.content.toLowerCase().match(prefixos);

			//Remover o prefixo e dividir os espaços em arraia
			const argumentos = newMessage.content
				.slice(prefixoCerto.length)
				.trim()
				.split(/ +/);

			//Pegar o nome do comando (s!ban Davi viraria apenad ban)
			const comandoNome = argumentos.shift().toLowerCase();

			//Procurar pelo nome do comando, se nao achar, procurar aliases.
			const comando =
				client.commands.get(comandoNome) ||
				client.commands.find(cmd => cmd.aliases.includes(comandoNome));

			if (!comando) return;
      
      
			//Verificar se o membro possui perms
			if (!newMessage.member.permissions.has(comando.permissoes.membro))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Você não possui permissões necessárias para executar este comando. Você precisa de: \`${comando.permissoes.membro.join(
						', '
					)}\`.`
				);

			//Verificar se o bot possui perms
			if (!newMessage.member.permissions.has(comando.permissoes.bot))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Eu não possuo permissões necessárias para executar este comando. Preciso de: \`${comando.permissoes.membro.join(
						', '
					)}\`.`
				);

			//Verificar se o usuario é dev do bot
			if (
				comando.permissoes.dono &&
				![
					'704468807229505637',
					'672652538880720896',
					'717766639260532826',
					'742798447253651506'
				].includes(newMessage.author.id)
			)
				return nMsg.channel.send(
					`:x: ${newMessage.author} **|** Você não está na lista de desenvolvedores.`
				);

			//Bora executar o comando se estiver tudo OK.
			if(prefixoCerto.includes(client.user.id)) { prefixoCerto = 's.'
                nMsg.mentions.users.delete(client.user.id)
			}
			try {
				await comando.run(client, nMsg, argumentos, prefixoCerto, idioma);
			} catch (e) {
				console.log(e);
				return newMessage.reply(`deu ruim.\n\`\`\`${e.toString()}\`\`\``);
			}
		}
	});
};

// - BONEE e Davi