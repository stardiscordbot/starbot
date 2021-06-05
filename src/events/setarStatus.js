module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'ready',
            run: this.run
        }
    }
    async run() {
        require('colors');
        /*
        setTimeout(() => {
        api.postStats({
            serverCount: star.guilds.size,
            shardCount: 1
        })
    }, 300000)
    */
        console.log(`[CLIENT] ${star.user.username+"#"+star.user.discriminator} Iniciada!`.dim.brightMagenta)

        setTimeout(() => {
            const status = [
                'Type: s!help',
                `Guilds: ${star.guilds.size}`
            ]
            const stat = Math.floor(Math.random() * (status.length - 1) + 1);
            star.editStatus("online", {game: star.user.username, name: `s!help | ${star.guilds.size} guilds`, type: 5});
        }, 1000 * 30)
    }
}
