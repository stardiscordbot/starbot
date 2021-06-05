module.exports = class EventlogCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['manageGuild'], //Permissoes que o usuario necessita
				bot: ['MANAGE_WEBHOOKS'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'logs',
				categoria: '⚙️ • Config',
				desc: 'Define um canal para receber as logs do servidor.'
			},
			en: {
				nome: 'logs',
				categoria: '⚙️ • Config',
				desc: 'Set a channel to receive the server logs.'
			},
			aliases: ['serverlogs', 'messagelog', 'meblogs', 'guildlogs', 'eventlog'],
			run: this.run
		};
	}

	async run(ctx) {

        if (!ctx.args[0])
        return ctx.message.channel.createMessage(
            `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.guildLogs.insertChannel.replace(
                '%p',
                ctx.prefix
            )}`
        );

		if (
			ctx.args[0] &&
			(ctx.args[0].toLowerCase() === 'desativar' ||
				ctx.args[0].toLowerCase() === 'disable')
		) {
			await db.del(`logs-${ctx.message.guildID}`);
			return ctx.message.channel.createMessage(
				`:white_check_mark: ${ctx.message.author.mention} **|** ${
					ctx.idioma.guildLogs.disabled
				}`
			);
		}

        let logs = ctx.message.mentions.channels.first() || await ctx.message.guild.channels.fetch(ctx.args[0]);

		if (!logs)
			return ctx.message.channel.createMessage(
				`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.guildLogs.insertChannel.replace(
					'%p',
					ctx.prefix
				)}`
			);

		await db.set(`logs-${ctx.message.guildID}`, logs.id);
        
        const embed = new star.manager.ebl;
        embed.title('<:st_tools:846423174686310473> Event Log')
        embed.description(`<:st_config:845647892932067369> ${ctx.idioma.guildLogs.success.replace('%canal', logs.name)}`)
		embed.thumbnail(star.user.avatarURL)
        embed.color('#dd3af0')
        return ctx.message.channel.createMessage(embed.create)
	}
};