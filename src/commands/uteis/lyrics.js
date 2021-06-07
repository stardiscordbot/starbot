module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'lyrics',
				categoria: '🕰️ • Utilidades',
				desc: 'Veja as mensagens de algum usuário'
			},
			en: {
				nome: 'lyrics',
				categoria: '🕰️ • Utility',
				desc: 'See a user messages'
			},
			aliases: ['letra'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.say.noarg}`)
		const fetch = require("star-fetch")
		const musica = fetch(`https://lyrics-api.powercord.dev/lyrics?input=${ctx.args.join(" ").replace(/ /g, '%20')}`).data[0]

        const embed = new star.manager.ebl;
        	embed.title(`<a:st_disco:830835645232316497> Lyrics | ${star.user.username}`)
            embed.description(`${musica.lyrics}`)
            embed.color('#dd3af0')
            embed.thumbnail(star.user.avatarURL)
        ctx.message.channel.createMessage(embed.create)
    }
};

//ADG, Davi e LRD