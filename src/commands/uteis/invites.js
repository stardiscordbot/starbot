module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'invites',
				categoria: '🕰️ • Utilidades',
				desc: 'Veja quantos invites um usuário tem'
			},
			en: {
				nome: 'invites',
				categoria: '🕰️ • Utility',
				desc: 'View a user invites'
			},
			aliases: ['iv', 'joins', 'invis', 'div'],
			run: this.run
		};
	}
	async run(ctx) {
    const user = ctx.args[0] ? ctx.message.mentions[0] || await ctx.message.guild.members.fetch(ctx.args[0]) : ctx.message.member;
    ctx.message.guild.fetchInvites().then((invites) => {
        let inviteCounter = {}
        invites.forEach((invite) => {
            inviteCounter[invite.inviter.id] = (inviteCounter[invite.inviter.id] || 0) + invite.uses
        })  
            const c = (inviteCounter[user.id] || 0);
            const embed = new star.manager.ebl;
            embed.title('📩 Invites')
            embed.color('#dd3af0')
            embed.description(`**${user.user.username}** tem **${c} invites**`)
            ctx.send(embed.create);

        })
    }
};

//ADG, Davi e LRD