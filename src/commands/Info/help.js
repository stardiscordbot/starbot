module.exports = class HelpCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ajuda',
				categoria: '📖 • Info',
				desc: 'Veja todos os comandos que você pode usar.'
			},
			en: {
				nome: 'help',
				categoria: '📖 • Info',
				desc: 'See all bot commands that are available.'
			},
			aliases: ['comandos', 'commands', 'cmds', 'cmd', 'ajuda', 'help'],
			run: this.run
		};
	}
	async run(client, message, args, prefixoCerto) {

    const adg = await client.users.fetch('717766639260532826')
    const andre = await client.users.fetch('742798447253651506')
	const davi = await client.users.fetch('704468807229505637')

    const color = message.member.displayHexColor;
    //if (color == '#000000') color = message.member.hoistRole.hexColor;

		let idioma = (await client.db.get(`idioma-${message.guild.id}`)) || 'pt';
		let categorias = {} 
		let msg = message;
		const embed = new (require('discord.js')).MessageEmbed(); 
		switch (idioma) {
			case 'pt':
				client.commands.forEach(comando => {
					if (comando.permissoes.dono) return;
					if (!categorias[comando.pt.categoria])
						categorias[comando.pt.categoria] = [];
					categorias[comando.pt.categoria].push(
						`\`${comando.pt.nome}\``
					);
				});
				embed.setColor(color);
				embed.setTitle(`Lista de Comandos • ${client.user.username}`);
				embed.setDescription(
					`> Meu prefixo atual é: \`${prefixoCerto}\`\n> Caso tenha alguma duvida entre em meu suporte: [Clique Aqui](https://discord.gg/2pFH6Yy)\n> Fui desenvolvida por: \`${adg.tag}, ${andre.tag}\`\n> Me adicione clicando [aqui](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot&permissions=805432446)`
				);
				embed.setFooter(
					`Utilizado por: ${msg.author.tag}`,
					msg.author.displayAvatarURL()
				);
				for (var categoria in categorias) {
					embed.addField(categoria, `${categorias[categoria].join('│')}`);
				}

				if(args[0]) {
					const cmd = await 
					client.commands.get(args[0]) ||
					client.commands.find(cmd => cmd.aliases.includes(args[0]));

					if(!cmd) return message.quote(`:x: ${message.author} **|** Esse comando não existe`)
			
					const help = new (require('discord.js')).MessageEmbed()
					.setTitle(':wave: | ' + cmd.pt.nome.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' '))
					.addField(':book: Descrição:', `\`${cmd.pt.desc}\`` , false)
					.addField(':small_blue_diamond: Permissões do bot:', `\`${cmd.permissoes.bot.join('`,`') || `Esse comando não necessita de permissões`}\``, false)
					.addField(':small_orange_diamond: Permissões do usuário:', `\`${cmd.permissoes.membro.join('`,`') || `Esse comando não necessita de permissões especiais para ser executado`}\``, false)
					.setColor(color)
					.setTimestamp()
					.setFooter('Star™ (c) 2021')
			
					if(cmd.aliases.join(',') !== ''){
						help.addField(':twisted_rightwards_arrows: Sinônimos:',  `\`${cmd.aliases.join('`,`')}\``, false )
					}
				
					return msg.quote(help)
				}

				msg.quote({ embed })
				break;
			case 'en':
				client.commands.forEach(comando => {
					if (comando.permissoes.dono) return;
					if (!categorias[comando.en.categoria])
						categorias[comando.en.categoria] = [];
					categorias[comando.en.categoria].push(
						`\`${comando.en.nome}\``
					);
				});
				embed.setColor(color);
				embed.setTitle(`Command List • ${client.user.username}`);
				embed.setDescription(`> My current prefix is: \`${prefixoCerto}\`\n> If you have any questions, please contact my support: [Click Here](https://discord.gg/2pFH6Yy)\n> I was developed by: \`${adg.tag}, ${bonee.tag}, ${davi.tag}\`.`);
				embed.setFooter(
					`Used by: ${msg.author.tag}`,
					msg.author.displayAvatarURL()
				);
				for (var categoria in categorias) {
					embed.addField(categoria, `${categorias[categoria].join(' ,')}`);
				}

				if(args[0]) {
					const cmd = await 
					client.commands.get(args[0]) ||
					client.commands.find(cmd => cmd.aliases.includes(args[0]));

					if(!cmd) return message.quote(`:x: ${message.author} **|** This command does not exist`)
			
				
					const help = new (require('discord.js')).MessageEmbed()
					.setTitle(':wave: | ' + cmd.en.nome.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' '))
					.addField(':book: Description:', `\`${cmd.en.desc}\`` , false)
					.addField(':small_blue_diamond: Bot permissions:', `\`${cmd.permissoes.bot.join('`,`') || `This command does not need permissions`}\``, false)
					.addField(':small_orange_diamond: User permissions:', `\`${cmd.permissoes.membro.join('`,`') || `This command does not need special permissions to be executed`}\``, false)
					.setColor(color)
					.setTimestamp()
					.setFooter('Star™ (c) 2021')
			
					if(cmd.aliases.join(',') !== ''){
						help.addField(':twisted_rightwards_arrows: Aliases:',  `\`${cmd.aliases.join('`,`')}\``, false )
					}
					
				
					return msg.quote(help)
				}

				msg.quote({ embed })
				break;
		}
	}
};

//Davi e André