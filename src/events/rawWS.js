module.exports = class rawWS {
  constructor () {
    return {
      nome: 'rawWS',
      run: this.run
    }
  }

  async run (packet) {
    global.star.music.updateVoiceState(packet)
  }
}
