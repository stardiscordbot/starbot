module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['attachFiles'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'morrepraga',
				categoria: '😄 • Diversão',
				desc: 'MORRE PRAGA'
			},
			en: {
				nome: 'dieplague',
				categoria: '😄 • Fun',
				desc: 'DIE PLAGUE'
			},
			aliases: ['dp', 'mp'],
			run: this.run
		};
	}
	async run(ctx) {
        const {createCanvas,loadImage} = require("canvas");
		const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch(_ => ctx.ctx.message.author.mention) : ctx.message.author

		const background = await loadImage("./assets/dieplague.jpg");
        const canvas = createCanvas(background.width, background.height);
        const foto = canvas.getContext('2d');

        foto.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await loadImage(user.avatarURL);
        foto.drawImage(avatar, 50, 100, 150, 150);
		
        ctx.message.channel.createMessage(ctx.message.author.mention, {
			file: canvas.toBuffer(),
            name: "dieplague.png"
		})
    }
};

//ADG, Davi e LRD