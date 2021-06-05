module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ping',
				categoria: '📖 • Informação',
				desc: 'Veja a latência do bot'
			},
			en: {
				nome: 'ping',
				categoria: '📖 • Information',
				desc: 'See bot latency'
			},
			aliases: ['latency', 'ws', 'pong'],
			run: this.run
		};
	}
	async run(ctx) {
		const ping = db.ping;
		return ctx.message.channel.createMessage(`🏓 **|** ${ctx.message.author.mention} Pong!\n- **Websocket Ping:** \`${Date.now() - ctx.message.timestamp}ms\`\n- **API Ping:** \`${ctx.message.channel.guild.shard.latency}ms\`\n- **Database:** \`${ping.write}ms\``)}
};

//ADG, Davi e LRD
