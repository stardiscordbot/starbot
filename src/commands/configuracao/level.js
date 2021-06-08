module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['manageGuild'], //Permissoes que o usuario necessita
				bot: ['MANAGE_ROLES'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'levelsystem',
				categoria: '🕰️ • Utilidades',
				desc: 'Gerencia o sistema de levels'
			},
			en: {
				nome: 'levelsystem',
				categoria: '🕰️ • Utility',
				desc: 'Manage the level system'
			},
			aliases: ['levelsystem', 'rolelevel', 'cargolevel'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Siga o exemplo: \`role [@cargo|id] [level(ex:1)]\``)
        if(!ctx.args[1]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Siga o exemplo: \`role [@cargo|id] [level(ex:1)]\``)
        const role = await ctx.message.mentions.roles.first() || ctx.message.guild.roles.fetch(ctx.args[0])
        //const carg = args[1]
        const level = ctx.args[1]
        db.set(`cargo-${ctx.message.guildID}-${level}`, role.id)
        ctx.message.addMessageReaction("✅")
    }
};

//ADG, Davi e LRD