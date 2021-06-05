//🧭 → Servers [NaN]
module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'guildCreate',
            run: this.run
        }
    }
    async run(guild) {
        const ch = await star.channels.fetch("848955667866976276")
        ch.setName(`🧭 → Servers [${star.guilds.cache.size}]`)
    }
}