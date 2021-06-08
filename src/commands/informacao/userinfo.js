module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['embedLinks'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'userinfo',
				categoria: '📖 • Informação',
				desc: 'Veja as informações sobre um usuário!'
			},
			en: {
				nome: 'userinfo',
				categoria: '📖 • Information',
				desc: 'View a user info!'
			},
			aliases: ['whois', 'memberinfo', 'user', 'member', 'ui', 'mi'],
			run: this.run
		};
	}
	async run(ctx) {
    const moment = require("moment")
	const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]).catch(_ => ctx.message.author) : ctx.message.author
    
	const embed = new star.manager.ebl;
    embed.title(`<:st_discord:847806904808898600> ${ctx.idioma.userinfo.inf} __${user.username}__`)
    embed.color('#dd3af0')
    embed.field(`📘 ❯ ${ctx.idioma.userinfo.tag} __${user.username}__`, `\`${user.username}#${user.discriminator}\``, true)
    embed.field(`📚 ❯ ${ctx.idioma.userinfo.id} __${user.username}__`, `\`${user.id}\``, true)
    embed.field(`📆 ❯ ${ctx.idioma.userinfo.create}`, `\`${moment(user.createdAt).format('📆 DD/MM/YYYY')}\n${moment(user.createdAt).format('⏰ HH:mm:ss')}\``, true)
    embed.thumbnail(user.avatarURL || "https://i.imgur.com/2dwGomm.png")
    ctx.send(embed.create)
    }
}

//ADG, Davi e LRD
