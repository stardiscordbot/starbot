module.exports = class SlapCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['embedLinks'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'slap',
				categoria: '😄 • Diversão',
				desc: 'Bata em seu amigo'
			},
			en: {
				nome: 'slap',
				categoria: '😄 • Fun',
				desc: 'Slap your friend'
			},
			aliases: ['tapa', 'soco'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
        const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch((e) => {
            return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
        })
        const fetch = require("star-fetch");
        let res = fetch("https://nekos.life/api/v2/img/slap");
        const ReactionCollector = require("../../Helpers/ReactionCollector");
        let embed = new star.manager.ebl;
        embed.description(`👊 **${ctx.message.author.username}** ${ctx.idioma.hug.acaba.replace("acaba de abraçar", "bateu em").replace("just hugging", "slapped")} **${user.username}**.`)
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
                let res = fetch("https://nekos.life/api/v2/img/slap");
                let embed = new star.manager.ebl;
                embed.description(`👊 **${user.username}** ${ctx.idioma.hug.acaba.replace("acaba de abraçar", "bateu em").replace("just hugging", "slapped")} **${ctx.message.author.username}**.`)
                embed.image(res.url)
                embed.color('#dd3af0')
                message.channel.createMessage(embed.create);
            });
        })
    }
}