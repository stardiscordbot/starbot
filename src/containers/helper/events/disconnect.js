module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'disconnect',
      run: this.run
    }
  }

  async run () {
    global.helper.connect()
  }
}
