module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: ['manageMessages'], //Permissoes que o usuario necessita
				bot: ['manageMessages'], //Permissoes que o bot necessita
				dono: true //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'nuke',
				categoria: '🔨 • Moderação',
				desc: 'Limpa todas as mensagens do canal'
			},
			en: {
				nome: 'nuke',
				categoria: '🔨 • Moderation',
				desc: 'Clear all message channels'
			},
			aliases: ['clearall', 'boom'],
			run: this.run
		};
	}
	async run(ctx) {
		const jsonc = {}
        const {MessageAttachment} = require("discord.js-light")
        ctx.send(`💥 ${ctx.message.author.mention} **|** Explodindo o canal...`)
        const channel = await star.channels.fetch(ctx.message.channel.id)
        jsonc.pos = channel.rawPosition
        
        const attachment = new MessageAttachment('./assets/boom.gif');

        channel.clone({
            reason: 'Nuke Command'
        }).then((can) => {
			channel.delete()
			can.setPosition(jsonc.pos)
            
            can.send(`💥 ${ctx.message.author.mention} **|** Canal explodido com sucesso.`, attachment)
        })
    }
};

//ADG, Davi e LRD
