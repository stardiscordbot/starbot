module.exports = class BanCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['kickMembers'], //Permissoes que o usuario necessita
				bot: ['kickMembers'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'kick',
				categoria: '🔨 • Moderação',
				desc: 'Bane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'kick',
				categoria: '🔨 • Moderation',
				desc: 'Bane algum usuário babaca de seu servidor'
			},
			aliases: ['expulsar', 'hackkick', 'forcekick', 'kickar'],
			run: this.run
		};
	}
	async run(ctx) {
        let member
        if(!ctx.args[0]) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`)
        
        if(!ctx.message.mentions[0]) {
            member = await star.getRESTUser(ctx.args[0])
        } else {
            member = await ctx.message.mentions[0];
        }
                ctx.message.channel.guild.kickMember(member.id, `${ctx.idioma.ban.mot2} ${ctx.message.author.tag} - ${ctx.idioma.ban.mot3} ${banReason}`).catch(err => {
					const embed = new star.manager.ebl;
					embed.title(`${ctx.idioma.message.e}`)
					embed.description(`\`\`\`js\n${err}\n\`\`\``)
					embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
					embed.color('#ff0000')
					embed.thumbnail(star.user.avatarURL)
					return ctx.message.channel.createMessage(embed.create)
				});
    }
};

//ADG, Davi e LRD
