module.exports = class LaranjoCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['attachFiles'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
            pt: {
                nome: 'laranjo',
                categoria: '🤣 • Fun',
                desc: 'Cria um meme do laranjo'
              },
              en: {
                nome: 'laranjo',
                categoria: '🤣 • Fun',
                desc: 'Create a laranjo meme'
              },
			aliases: ['laranjo', 'laranja'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`${idioma.image.args.replace("%u", message.author)}`)
        if((ctx.args.join(" ").length) > 300) return ctx.send(`${idioma.image.long.replace("%u", message.author)}`)
        const {createCanvas,loadImage} = require('canvas');
        const canvas = createCanvas(685, 494); 
        const foto = canvas.getContext('2d');
            
        const background = await loadImage('./assets/laranjo.jpg');
        foto.drawImage(background, 0, 0, canvas.width, canvas.height);
            
        foto.font = '30px sans-serif';
        foto.fillStyle = '#000';
        foto.fillText(`${ctx.args.join(" ")}`.match(/.{1,50}/g).join("\n"), canvas.width / 50.9, canvas.height / 15.9, 655);
        ctx.message.channel.createMessage(ctx.message.author.mention, {
			file: canvas.toBuffer(),
            name: "laranjo.png"
		})
    }
}