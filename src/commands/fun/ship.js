module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: ['attachFiles'], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ship',
				categoria: '😄 • Diversão',
				desc: 'Veja se um casal dá certo'
			},
			en: {
				nome: 'ship',
				categoria: '😄 • Fun',
				desc: 'See if a couple works'
			},
			aliases: ['shippar', 'friendship'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.addReaction("❌")
        let porcentagem
        
        const user1 = ctx.message.author
        const user2 = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])

        if(!user2) return ctx.addReaction("❌")

        const ship1 = await db.get(`ship-${user1.id}-${user2.id}`)
        const ship2 = await db.get(`ship-${user1.id}-${user2.id}`)

        const nome = user1.username.slice(0,3) + user2.username.slice(0,3)

        if(!ship1 && !ship2) {
            porcentagem = Math.floor(Math.random()*101)
        } else {
            porcentagem = ship1
        }

        if(user1.id == user2.id) {
            porcentagem = 50
        }
        let description;
        let emoji;

        if(porcentagem <= 23){
            description = `**${porcentagem}%** \`${nome.replace(/`/g, '')}\` ${ctx.idioma.ship.d1}`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f645-2640.png'
        }

        if(porcentagem > 23 && porcentagem <= 47){
            description = `**${porcentagem}%** \`${nome.replace(/`/g, '')}\` ${ctx.idioma.ship.d2}`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f91d.png'
        }

        if(porcentagem > 47 && porcentagem <= 80){
            description = `**${porcentagem}%** \`${nome.replace(/`/g, '')}\` ${ctx.idioma.ship.d3}`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f440.png'
        }

        if(porcentagem > 80){
            description = `**${porcentagem}%** \`${nome.replace(/`/g, '')}\` ${ctx.idioma.ship.d4}`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/2764.png'
        }
        
        const {createCanvas,loadImage} = require('canvas')

        const avatar1 = user1.avatarURL;
        const avatar2 = user2.avatarURL;

        const edit = createCanvas(700, 250)
        const edita = edit.getContext('2d')
        const img1 = await loadImage(avatar1)
        const img2 = await loadImage(avatar2)
        const emoji2 = await loadImage(emoji)

        edita.drawImage(img1, 25, 25, 200, 200)
        edita.drawImage(emoji2, 250, 25, 200, 200)
        edita.drawImage(img2, 480, 25, 200, 200)

        ctx.message.channel.createMessage(`💖 ${ctx.message.author.mention} 💖\n>>> ${description}`, {
			file: edit.toBuffer(),
            name: "ship.png"
		}).then(async msg => {
            if(!ship1 && !ship2) {
                await db.set(`ship-${user1.id}-${user2.id}`, porcentagem)
                await db.set(`ship-${user2.id}-${user1.id}`, porcentagem)
            } else {
                return;
            }
        })
    }
};

//ADG, Davi e LRD