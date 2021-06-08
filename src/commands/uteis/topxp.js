module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'topxp',
				categoria: '🕰️ • Utilidades',
				desc: 'Veja o rank de xp'
			},
			en: {
				nome: 'topxp',
				categoria: '🕰️ • Utility',
				desc: 'See the xp rank'
			},
			aliases: ['toplevel', 'toprank', 'top', 'rankcard'],
			run: this.run
		};
	}
	async run(ctx) {
        let xpa = await db.all()
        let xp = xpa.filter(lb => lb.ID.startsWith(`xp-${ctx.message.guildID}`)).sort((a, b) => b.data- a.data)
        let ien = xp.slice(0, 10)
        let content
        //console.log(ien)

        for(let i = 0; i < ien.length; i++) {
            let user = await star.getRESTUser(ien[i].ID.split('-')[2])
            content += `**${i+1}.** \`${user.tag}\` - **${ien[i].data}**\n`
        }

        const embed = new star.manager.ebl;
        embed.title(`${ctx.message.guild.name}`)
        embed.color('#dd3af0')
        embed.description(`${content.replace("undefined", "")}`)
        embed.thumbnail(ctx.message.guild.iconURL())
        ctx.send(embed.create)
    }
};

//ADG, Davi e LRD