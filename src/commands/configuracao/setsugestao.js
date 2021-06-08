module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['manageGuild'], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'setsugestao',
				categoria: '📖 • Informação',
				desc: 'Seta o canal de sugestão'
			},
			en: {
				nome: 'setsugestao',
				categoria: '📖 • Information',
				desc: 'Set the suggestion channel'
			},
			aliases: ['setsugestão', 'setsuggestion', 'set-sugestao', 'set-sugestão', 'set-suggestion'],
			run: this.run
		};
	}
	async run(ctx) {
		if (!ctx.args[0])
			return ctx.send(
				`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.sugestao.insertChannel.replace(
					'%p',
					ctx.prefix
				)}`
			);
            
            if (
                ctx.args[0] &&
                (ctx.args[0].toLowerCase() === 'desativar' ||
                    ctx.args[0].toLowerCase() === 'disable')
            ) {
                await db.del(`sugestao-${ctx.message.guildID}`);
                return ctx.send(
                    `:white_check_mark: ${ctx.message.author.mention} **|** ${
                        ctx.idioma.sugestao.disabled
                  
				  
					}`
                );
            }

            let logs =
			ctx.message.mentions.channels.first() ||
			star.getRESTChannel(String(ctx.args[0]));

		if (!logs)
			return ctx.send(
				`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.sugestao.insertChannel.replace(
					'%p',
					ctx.prefix
				)}`
			);

		await db.set(`sugestao-${ctx.message.guildID}`, logs.id);

		return ctx.send(
			`:white_check_mark: ${
				ctx.message.author
			} **|** ${ctx.idioma.sugestao.success.replace('%canal', logs.name)}`
		);
	}
};

//ADG