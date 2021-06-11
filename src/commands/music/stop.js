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
                desc: 'Mostra a loja do Fortnite'
            },
            en: {
                nome: 'stop',
                categoria: '🎵 • Music',
                desc: 'Show the Fortnite store'
            },
            aliases: ['parar', 'leave'],
            run: this.run
        }
    }
    async run(ctx) {
        const player = star.music.players.get(ctx.message.channel.guild.id)
        if(!player) {
            return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
        } else {
            player.destroy();
            return ctx.send(`🛑 ${ctx.message.author.mention} **|** ${ctx.idioma.player.stop}`)
        }
    }
}