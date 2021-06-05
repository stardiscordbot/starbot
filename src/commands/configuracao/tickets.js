module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['manageGuild'], //Permissoes que o usuario necessita
				bot: ['manageChannels'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'tickets',
				categoria: '🕰️ • Utilidades',
				desc: 'Configura o sistema de tickets'
			},
			en: {
				nome: 'tickets',
				categoria: '🕰️ • Utility',
				desc: 'Manage the ticket system'
			},
			aliases: ['ticketsu', 'ticketsetup'],
			run: this.run
		};
	}
	async run(ctx) {
    const cat = db.get(`ticketcat-${ctx.message.guildID}`)
    const cat2 = db.get(`ticketcat2-${ctx.message.guildID}`)
    if(!cat) {
        ctx.message.guild.channels.create(`TICEKTS | NÃO DELETAR`, { type: "category" }).then(catt => {
            db.set(`ticketcat-${ctx.message.guildID}`, catt.id)
        })
        ctx.message.guild.channels.create(`TICKETS-FECHADOS | NÃO DELETAR`, { type: "category" }).then(catt2 => {
            db.set(`ticketcat2-${ctx.message.guildID}`)
        })
    } else {
		ctx.message.guild.channels.create(`TICEKTS | NÃO DELETAR`, { type: "category" }).then(catt => {
            db.set(`ticketcat-${ctx.message.guildID}`, catt.id)
        })
        ctx.message.guild.channels.create(`TICKETS-FECHADOS | NÃO DELETAR`, { type: "category" }).then(catt2 => {
            db.set(`ticketcat2-${ctx.message.guildID}`)
        })
    }
    ctx.message.addMessageReaction("✅")
    }
};

//ADG, Davi e LRD