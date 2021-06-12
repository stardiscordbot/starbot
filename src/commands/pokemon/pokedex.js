module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'pokedex',
				categoria: '📖 • Informação',
				desc: 'Pesquisa informações sobre um Pokémon'
			},
			en: {
				nome: 'pokedex',
				categoria: '📖 • Information',
				desc: 'Research information about a Pokémon'
			},
			aliases: ['pdx', 'pokemon', 'poke'],
			run: this.run
		};
	}
	async run(ctx) {
		const fetch = require("star-fetch")
		if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
		const res = fetch(`https://some-random-api.ml/pokedex?pokemon=${ctx.args.join(" ").replace(/ /g, '%20')}`)

			const tr = fetch(`http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=PT&dt=t&q=${res.description}&ie=UTF-8&oe=UTF-8`)
			let pdesc
			
			if(ctx.idioma.pdex.lang !== 'en') {
				pdesc = tr[0][0][0]
			} else {
				pdesc = res.description
			}

			//console.log(tr.data)
            const embed = new star.manager.ebl;
            embed.title(`<:st_pokedex:845365598141415475> Pokedex | ${res.name.slice(0,1).toUpperCase() + res.name.slice(1)}`)
            embed.color('#dd3af0')
            embed.description(`${pdesc}`)
            embed.thumbnail(res.sprites.animated)
            embed.field(`📋 Pokémon Stats:`, `**Hp:** ${res.stats.hp}\n**Attack:** ${res.stats.attack}\n**Defense:** ${res.stats.defense}\n**Special Attack:** ${res.stats.sp_atk}\n**Special Defense:** ${res.stats.sp_def}\n**Speed:** ${res.stats.speed}`)
            ctx.send(embed.create)
			        
    }
};

//ADG, Davi, LRD e como sempre o Andre arruma as cagadas
