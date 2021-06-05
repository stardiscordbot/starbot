//🧭 → Servers [NaN]
module.exports = class SetarStatus {
    constructor() {
        return {
            nome: 'disconnect',
            run: this.run
        }
    }
    async run() {
        star.connect()
    }
}