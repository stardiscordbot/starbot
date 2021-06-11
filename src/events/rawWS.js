module.exports = class rawWS {
    constructor() {
        return {
            nome: 'rawWS',
            run: this.run
        }
    }
    async run(packet) {
        star.music.updateVoiceState(packet)
    }
}