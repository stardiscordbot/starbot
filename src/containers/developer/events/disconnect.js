module.exports = class Disconnect {
  constructor () {
    return {
      nome: 'disconnect',
      run: this.run
    }
  }

  async run () {
    global.dev.connect()
  }
}
