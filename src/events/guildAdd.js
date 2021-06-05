//🧭 → Servers [NaN]
module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'guildCreate',
            run: this.run
        }
    }
    async run(guild) {
        const ch = await star.getRESTChannel("848955667866976276")
        ch.edit({name: `🧭 → Servers [${star.guilds.size}]`})
    }
}