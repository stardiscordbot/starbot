module.exports = class PlayCommand {
    constructor() {
        return {
            permissoes: {
                membro: [],
                bot: ['embedLinks'],
                dono: false
            },
            pt: {
                nome: 'vaporwave',
                categoria: '🎵 • Música',
                desc: 'Ativa o filtro vaporwave'
            },
            en: {
                nome: 'vaporwave',
                categoria: '🎵 • Music',
                desc: 'Activates the vaporwave filter'
            },
            aliases: ['vapor', 'vp', 'wave', 'vapor-wave', 'vaporonda'],
            run: this.run
        }
    }
    async run(ctx) {
        const player = await star.music.players.get(ctx.message.channel.guild.id)
        if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
        if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
        if(player.vaporwave == false) {
            await star.music.players.get(ctx.message.channel.guild.id).setVaporwave(true)
            return ctx.message.addReaction("✅")
        }
        if(player.vaporwave == true) {
            await star.music.players.get(ctx.message.channel.guild.id).setVaporwave(false)
            return ctx.message.addReaction("✅")
        }
    }
}