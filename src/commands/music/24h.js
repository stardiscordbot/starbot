module.exports = class hCommand {
    constructor() {
        return {
            permissoes: {
                membro: [],
                bot: [],
                dono: false
            },
            pt: {
                nome: '24',
                categoria: '🎵 • Música',
                desc: 'Ativa o filtro 8D'
            },
            en: {
                nome: '24',
                categoria: '🎵 • Music',
                desc: 'Activates the 8D filter'
            },
            aliases: ['8dias', 'twofourh'],
            run: this.run
        }
    }
    async run(ctx) {
        const player = await star.music.players.get(ctx.message.channel.guild.id)
        if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
        if (player.get('24h').status == false) {
            player.set('24h', {
                status: true
            })
            ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.h.ativado}`)
        } else {
            player.set('24h', {
                status: false
            })
            ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.h.desativado}`)
        }
    }
}