module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'ready',
      run: this.run
    }
  }

  async run () {
    require('colors')
    console.log(`[CLIENT] ${global.dev.user.username + '#' + global.dev.user.discriminator} Iniciada!`.dim.brightMagenta)
    global.dev.editStatus('idle', {
      game: global.helper.user.username,
      name: 'Bot de desenvolvedores [v.1.0.0]',
      type: 5
    })
  }
}
