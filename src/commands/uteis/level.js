module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['attachFiles'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'level',
				categoria: '🕰️ • Utilidades',
				desc: 'Veja seu nível'
			},
			en: {
				nome: 'level',
				categoria: '🕰️ • Utility',
				desc: 'See you level'
			},
			aliases: ['xp', 'rank', 'levels'],
			run: this.run
		};
	}
	async run(ctx) {
        const canvacord = require("canvacord");
        //let ranks = db.all().filter(lb => lb.ID.startsWith(`xp-${message.guildID}`).sort((a, b) => b.data- a.data))
        const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]) : ctx.message.author;

        let userlevel = await db.get(`level-${ctx.message.guildID}-${user.id}`)
        let userxp = await db.get(`xp-${ctx.message.guildID}-${user.id}`)
        if(!userlevel) {
            userlevel = 1
        }
        if(!userxp) {
            userxp = 0
        }
        const {MessageAttachment} = require("discord.js-light")
        let req = userlevel * 1000
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 }))
        .setCurrentXP(userxp)
        .setRequiredXP(req + 1000)
        .setCustomStatusColor("#006fff")
        .setLevel(userlevel)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator);
        rank.build().then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        ctx.send(ctx.message.author, attachment);
    });
    }
};

//ADG, Davi e LRD