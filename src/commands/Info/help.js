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
    const bonee = await client.users.fetch('672652538880720896')
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
						`- \`${comando.pt.nome}\`\n  • ${comando.pt.desc.endsWith('.')?comando.pt.desc:comando.pt.desc+'.'}`
					);
				});
				embed.setColor(color);
				embed.setTitle(`Lista de Comandos • ${client.user.username}`);
				embed.setDescription(
					`> Meu prefixo atual é: \`${prefixoCerto}\`\n> Caso tenha alguma duvida entre em meu suporte: [Clique Aqui](https://discord.gg/2pFH6Yy)\n> Fui desenvolvida por: \`${adg.tag}, ${bonee.tag}, ${davi.tag}\``
				);
				embed.setFooter(
					`Utilizado por: ${msg.author.tag}`,
					msg.author.displayAvatarURL()
				);
				for (var categoria in categorias) {
					embed.addField(categoria, `${categorias[categoria].join('\n')}`);
				}
				msg.quote({ embed })
				break;
			case 'en':
				client.commands.forEach(comando => {
					if (comando.permissoes.dono) return;
					if (!categorias[comando.en.categoria])
						categorias[comando.en.categoria] = [];
					categorias[comando.en.categoria].push(
						`- \`${comando.en.nome}\`\n  • ${comando.en.desc.endsWith('.')?comando.en.desc:comando.en.desc+'.'}`
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
					embed.addField(categoria, `${categorias[categoria].join('\n')}`);
				}
				msg.quote({ embed })
				break;
		}
	}
};

//Davi