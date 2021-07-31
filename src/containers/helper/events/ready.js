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
    console.log(`[CLIENT] ${global.helper.user.username + '#' + global.helper.user.discriminator} Iniciada!`.dim.brightMagenta)
    global.helper.editStatus('dnd', {
      game: global.helper.user.username,
      name: `Retirando suas dúvidas [v${version}]`,
      type: 5
    })
  }
}
