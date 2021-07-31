module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'ready',
      run: this.run
    }
  }

  async run () {
    require('colors')
    const { version } = require('../../../../package.json')
    console.log(`[CLIENT] ${global.dev.user.username + '#' + global.dev.user.discriminator} Iniciada!`.dim.brightMagenta)
    global.dev.editStatus('idle', {
      game: global.helper.user.username,
      name: `Bot de desenvolvedores [v${version}]`,
      type: 5
    })
  }
}
