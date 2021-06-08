module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'campominado',
				categoria: '😄 • Diversão',
				desc: 'Campo minado é um popular jogo de computador para um jogador. Foi inventado por Robert Donner em 1989 e tem como objectivo revelar um campo de minas sem que alguma seja detonada.'
			},
			en: {
				nome: 'minefield',
				categoria: '😄 • Fun',
				desc: 'Minesweeper is a popular single player computer game. It was invented by Robert Donner in 1989 and aims to reveal a minefield without any being detonated.'
			},
			aliases: ['minefield', 'campominado', 'mf', 'cm', 'minesweeper', 'ms'],
			run: this.run
		};
	}
	async run(ctx) {
        const mineGen = require("../../minefield");

        const embed = new star.manager.ebl;
        embed.title('💥 MineField')
        embed.description(mineGen(10))
        embed.color('#dd3af0')
        embed.thumbnail(star.user.avatarURL)
        ctx.send(embed.create);
    }
};

//ADG, Davi e LRD
