const webhook = require("../config/json/webhooks.json")

function regexEscapar(prefixo) {
	return prefixo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const votelog = require("../config/json/botlist.json")

const prefixos = new RegExp(
	`^(<@!?768923396465360938>|${regexEscapar('s!')}|${regexEscapar(
		's.'
	)}|star)\\s*`
); // menção, star, s. e s! serao prefixos
const webhookClient = new (require("discord.js")).WebhookClient(webhook.commands.id, webhook.commands.token);
const cooldown = new Set();

module.exports = (client) => {
	client.on('message', async msg => {

		const cmdembed = new (require("discord.js")).MessageEmbed()
		.setAuthor(`${msg.guild.name} (${msg.guild.id})`, msg.guild.iconURL())
		.addField(`Usuário:`, `\`${msg.author.tag} (${msg.author.id})\``)
		.addField(`Comando:`, `\`${msg.content}\``)
		.addField(`URL:`, `\`${msg.url}\``)
		.setColor("GREEN")
	

		var message = msg;

		if (msg.author.bot) return;

		let regexMention = new RegExp(`^<@!?${client.user.id}>$`);

		require('../../utils/quote');
		let idioma = (await client.db.get(`idioma-${msg.guild.id}`)) || 'pt';
		
		idioma = client.lang[idioma];

		verificarPing();
		verificarComando();
		function verificarPing() {
			if (msg.content.match(regexMention))
				return msg.quote(idioma.mention.response.replace('%u', msg.author.username));
		}

		async function verificarComando() {
		  let botban = await client.db.get(`blacklist`)
			//Verificar se a mensagem tem algum dos prefixos da regex

      if(!botban) {
        client.db.push(`blacklist`, client.user.id);
      }

			if(botban.includes(msg.author.id)) return;
			if (!prefixos.test(message.content.toLowerCase())) return;

			//Procurar prefixo usado na mensagem com regex
			let [, prefixoCerto] = message.content.toLowerCase().match(prefixos);

			//Remover o prefixo e dividir os espaços em arraia
			const argumentos = message.content
				.slice(prefixoCerto.length)
				.trim()
				.split(/ +/);

			//Pegar o nome do comando (s!ban Davi viraria apenad ban)
			const comandoNome = argumentos.shift().toLowerCase();

			//Procurar pelo nome do comando, se nao achar, procurar aliases.
			const comando =
				client.commands.get(comandoNome) ||
				client.commands.find(cmd => cmd.aliases.includes(comandoNome));

		
      
                        if(!comando) return 
			//Verificar se o membro possui perms
			if (!msg.member.permissions.has(comando.permissoes.membro))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Você não possui permissões necessárias para executar este comando. Você precisa de: \`${comando.permissoes.membro.join(
						', '
					)}\`.`
				);

			//Verificar se o bot possui perms
			if (!msg.member.permissions.has(comando.permissoes.bot))
				return msg.channel.send(
					`:x: **|** ${
						msg.author
					} Eu não possuo permissões necessárias para executar este comando. Preciso de: \`${comando.permissoes.bot.join(
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
					'742798447253651506',
                    '568182075929395210'
				].includes(msg.author.id)
			)
				return msg.channel.send(
					`:x: ${msg.author} **|** Você não está na lista de desenvolvedores.`
				);

			//Bora executar o comando se estiver tudo OK.
			if(prefixoCerto.includes(client.user.id)) { prefixoCerto = 's.'
			  msg.mentions.users.delete(client.user.id)
			}
			try {
				await comando.run(client, msg, argumentos, prefixoCerto, idioma);
				webhookClient.send({
					username: client.user.username,
					avatarURL: client.user.displayAvatarURL({ dynamic: true }),
					embeds: [cmdembed]
				})
			} catch (e) {
				console.log(e);
				return msg.reply(`deu ruim.\n\`\`\`${e.toString()}\`\`\``);
			}
		}
	});
};

// - BONEE e Davi
