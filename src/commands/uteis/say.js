module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'say',
				categoria: '🕰️ • Utilidades',
				desc: 'Faça o bot falar'
			},
			en: {
				nome: 'say',
				categoria: '🕰️ • Utility',
				desc: 'The bot say'
			},
			aliases: ['falar'],
			run: this.run
		};
	}
	async run(ctx) {
		if(!ctx.args[0]) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.say.noarg}`)
        ctx.message.channel.createMessage(`${ctx.args.join(" ").replace(/@/g, '').replace(/#/g, '').replace(/`/g, '')}\n\n__<:st_wumpus:844541072855662593> ${ctx.idioma.say.enviada} ${ctx.message.author.mention}__`)
    }
};

//ADG, Davi e LRD