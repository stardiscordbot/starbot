module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['viewAuditLog'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'github',
				categoria: '🕰️ • Utilidades',
				desc: 'Faça o bot falar'
			},
			en: {
				nome: 'github',
				categoria: '🕰️ • Utility',
				desc: 'The bot say'
			},
			aliases: ['git'],
			run: this.run
		};
	}
	async run(ctx) {
        let badge;
		const fetch = require("star-fetch");
        const git = fetch(`https://api.github.com/users/${ctx.args.join(" ").replace(/ /g, "%20")}`)
        if(git.site_admin == true) {
            badge = "<:st_bots_certified:830834935605624867>"
        } else {
            badge = "<:st_bots_notcertified:830834979726426243>"
        }
        const embed = new star.manager.ebl;
        embed.title(`<:st_github:850386245887852545> Github | ${git.login} ${badge}`)
        embed.url(git.html_url)
        embed.field(`📋 Name:`, `\`\`\`${git.name || git.login}\`\`\``)
        embed.field(`📚 Bio:`, `\`\`\`md\n${git.bio || "Aff, só pra não ficar null"}\`\`\``)
        embed.field(`<:st_membros:845390325638889482> Social:`, `\`\`\`md\n# Followers: ${git.followers}\n# Following: ${git.following}\`\`\``)
        embed.color('#dd3af0')
        embed.thumbnail(git.avatar_url || star.user.avatarURL)
        ctx.message.channel.createMessage(embed.create)
    }
};

//ADG, Davi e LRD