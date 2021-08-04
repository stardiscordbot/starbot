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
    console.log(`[CLIENT] ${global.premium.user.username + '#' + global.premium.user.discriminator} Iniciada!`.dim.brightMagenta)
    global.premium.editStatus('dnd', {
      game: global.premium.user.username,
      name: `Premium [v${version}]`,
      type: 5
    })
  }
}
