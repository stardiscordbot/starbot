module.exports = class ReadyEvent {
    constructor() {
        return {
            nome: 'ready',
            run: this.run
        }
    }
    async run() {
        require('colors');
        console.log(`[CLIENT] ${star.user.username+"#"+star.user.discriminator} Iniciada!`.dim.brightMagenta)

        setInterval(() => {
            star.editStatus("online", {
                game: star.user.username,
                name: `s!help | ${star.guilds.size} guilds [v5.0.6]`,
                type: 5
            });
        }, 1000 * 60)
        setInterval(async () => {
            const backupchannel = await star.getRESTChannel("850788451359522857")
            const {readFile} = require("fs")
            const util = require("util")
            const read = util.promisify(readFile)
            backupchannel.createMessage(`<:st_host:830841046153691197> Backup do banco de dados!`, {
                file: await read("./data/base.json"),
                name: "base.json"
            })
        }, 1000 * 60)
        star.music.init(star.user.id)
    }
}