module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['attachFiles'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'perfect',
				categoria: '😄 • Diversão',
				desc: 'Quando alguém diz nada é perfeito'
			},
			en: {
				nome: 'perfect',
				categoria: '😄 • Fun',
				desc: 'When someone says nothing is perfect'
			},
			aliases: ['perfeito'],
			run: this.run
		};
	}
	async run(ctx) {
        const {createCanvas,loadImage} = require("canvas");
		const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch(_ => ctx.ctx.message.author.mention) : ctx.message.author

        const background = await loadImage("./assets/perfeito.png");
        const canvas = createCanvas(background.width, background.height);
        const avatar = await loadImage(user.avatarURL);
        const redondo = await loadImage("./assets/mask.png");
        const foto = canvas.getContext('2d');

        foto.drawImage(background, 0, 0, canvas.width, canvas.height);
        foto.drawImage(avatar, 250, 60, 200, 200);
        foto.drawImage(redondo, 250, 60, 200, 200);

        ctx.message.channel.createMessage(ctx.message.author.mention, {
			file: canvas.toBuffer(),
            name: "perfeito.png"
		})
    }
}