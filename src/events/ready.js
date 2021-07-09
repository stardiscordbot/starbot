module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'ready',
      run: this.run
    }
  }

  async run () {
    require('colors')
    console.log(`[CLIENT] ${global.star.user.username + '#' + global.star.user.discriminator} Iniciada!`.dim.brightMagenta)

    setInterval(() => {
      global.star.editStatus('online', {
        game: global.star.user.username,
        name: `s!help | ${global.star.guilds.size} guilds [v5.1.5]`,
        type: 5
      })
    }, 1000 * 60)
    // Backup da database
    setInterval(async () => {
      const backupchannel = await global.star.getRESTChannel('850788451359522857')
      const { readFile } = require('fs')
      const util = require('util')
      const read = util.promisify(readFile)
      const moment = require('moment')
      backupchannel.createMessage(`<:st_host:830841046153691197> Backup do banco de dados! | ${moment().format('DD/MM/YYYY | h:mm:ss')}`, {
        file: await read('./data/base.json'),
        name: 'base.json'
      })
    }, 1000 * 180)
    // Iniciando Música
    global.star.music.init(global.star.user.id)
  }
}
