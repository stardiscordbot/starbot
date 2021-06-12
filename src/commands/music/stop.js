module.exports = class StopCommand {
    constructor() {
        return {
            permissoes: {
                membro: [],
                bot: ['embedLinks'],
                dono: false
            },
            pt: {
                nome: 'stop',
                categoria: '🎵 • Música',
                desc: 'Para a música'
            },
            en: {
                nome: 'stop',
                categoria: '🎵 • Music',
                desc: 'Stop the music'
            },
            aliases: ['parar', 'leave'],
            run: this.run
        }
    }
    async run(ctx) {
        const player = await star.music.players.get(ctx.message.channel.guild.id)
        if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
        if (!player) {
            return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
        } else {
            player.destroy();
            return ctx.send(`🛑 ${ctx.message.author.mention} **|** ${ctx.idioma.player.stop}`)
        }
    }
}