module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'invite',
				categoria: '🕰️ • Utilidades',
				desc: 'Envia o link para me adicionar a outros servidores'
			},
			en: {
				nome: 'invite',
				categoria: '🕰️ • Utility',
				desc: 'Send the link to add me to other servers'
			},
			aliases: ['convidar', 'convidarbot', 'invitebot', 'convite'],
			run: this.run
		};
	}
	async run(ctx) {
        const embed = new star.manager.ebl;
        embed.title(`📩 ${ctx.idioma.desc.add}`)
        embed.description(ctc.idioma.invite.desc)
        embed.color('#dd3af0')
        embed.thumbnail(star.user.avatarURL)
        ctx.message.channel.createMessage(embed.create)
    }
};

//ADG, Davi e LRD