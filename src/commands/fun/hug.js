module.exports = class HugCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['embedLinks'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'hug',
				categoria: '😄 • Diversão',
				desc: 'Abrace seu amigo'
			},
			en: {
				nome: 'hug',
				categoria: '😄 • Fun',
				desc: 'Hug your friend'
			},
			aliases: ['abraçar', 'abraço', 'abracar', 'abraco'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
        const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch((e) => {
            return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
        })
        const fetch = require("star-fetch");
        let res = fetch("https://nekos.life/api/v2/img/hug");
        const ReactionCollector = require("../../Helpers/ReactionCollector");
        let embed = new star.manager.ebl;
        embed.description(`💖 **${ctx.message.author.username}** ${ctx.idioma.hug.acaba} **${user.username}**.`)
        embed.image(res.url)
        embed.color('#dd3af0')
        ctx.message.channel.createMessage(embed.create).then(msg => {
            msg.addReaction("🔁")
            const c = new ReactionCollector(msg, {
                user: user,
                ignoreBot: true,
                emoji: '🔁',
                time: 90000,
                max: 10,
                acceptReactionRemove: false,
                stopOnCollect: true,
            });
            c.on('collect', (message, emoji) => {
                let res = fetch("https://nekos.life/api/v2/img/hug");
                let embed = new star.manager.ebl;
                embed.description(`💖 **${user.username}** ${ctx.idioma.hug.acaba} **${ctx.message.author.username}**.`)
                embed.image(res.url)
                embed.color('#dd3af0')
                message.channel.createMessage(embed.create);
            });
        })
    }
}