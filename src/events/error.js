module.exports = class ErrorEvent {
    constructor() {
        return {
            nome: 'error',
            run: this.run
        }
    }
    async run(error) {
        console.log(`Olha, um erro!\nErro: ${error}`)
    }
}