module.exports = class PlayCommand {
    constructor() {
        return {
            permissoes: {
                membro: [],
                bot: ['embedLinks'],
                dono: false
            },
            pt: {
                nome: 'nightcore',
                categoria: '🎵 • Música',
                desc: 'Ativa o filtro bassboost'
            },
            en: {
                nome: 'nightcore',
                categoria: '🎵 • Music',
                desc: 'Activates the nightcore filter'
            },
            aliases: ['night', 'nc'],
            run: this.run
        }
    }
    async run(ctx) {
        const player = await star.music.players.get(ctx.message.channel.guild.id)
        if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
        if (!player) {
            return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
        } else {
            if(player.nightcore == false) {
                await star.music.players.get(ctx.message.channel.guild.id).setNightcore(true)
                return ctx.message.addReaction("✅")
            }
            if(player.nightcore == true) {
                await star.music.players.get(ctx.message.channel.guild.id).setNightcore(false)
                return ctx.message.addReaction("✅")
            }
        }
    }
}