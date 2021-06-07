module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'ready',
            run: this.run
        }
    }
    async run() {
        require('colors');
        console.log(`[CLIENT] ${star.user.username+"#"+star.user.discriminator} Iniciada!`.dim.brightMagenta)

        setTimeout(() => {
            star.editStatus("online", {game: star.user.username, name: `s!help | ${star.guilds.size} guilds [v5.0.3]`, type: 5});
        }, 1000 * 30)
    }
}
