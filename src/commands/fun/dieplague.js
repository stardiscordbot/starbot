module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
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
        const {loadImage,createCanvas} = require("canvas");
        //const {MessageAttachment} = require("discord.js-light");
        const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch(_ => ctx.message.author) : ctx.message.author

		const background = await loadImage("https://i.imgur.com/7GAAf63.png");
        const canvas = createCanvas(background.width, background.height);

        const foto = canvas.getContext('2d');
        foto.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await loadImage(user.avatarURL);
        foto.drawImage(avatar, 50, 100, 150, 150);

        //const attachment = new MessageAttachment(canvas.toBuffer(), `dieplague-${user.id}.png`)
        //ctx.send(ctx.message.author, attachment)
    }
};

//ADG, Davi e LRD