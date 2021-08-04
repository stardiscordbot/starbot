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
    const { version } = require('../../package.json')

    const adg = await global.star.getRESTUser('717766639260532826')

    // Status Array

    const status = [
      `www.star-bot.tk | ${global.star.user.username} [v${version}]`,
      `I'm on ${global.star.guilds.size} servers | ${global.star.user.username} [v${version}]`,
      `Follow me on twitter @stardiscordbot | ${global.star.user.username} [v${version}]`,
      `s!help | ${global.star.user.username} [v${version}]`,
      `s!upvote | ${global.star.user.username} [v${version}]`,
      `s!invite | ${global.star.user.username} [v${version}]`,
      `Join in my support server discord.gg/2pFH6Yy | ${global.star.user.username} [v${version}]`,
      `I was created by: ${adg.username}#${adg.discriminator}`
    ]

    // Presencer Array

    const presence = [
      'online',
      'idle',
      'dnd'
    ]

    // Setando status

    setInterval(() => {
      global.star.editStatus(presence[Math.floor(Math.random() * presence.length)], {
        game: global.star.user.username,
        name: status[Math.floor(Math.random() * status.length)],
        type: 5
      })
    }, 1000 * 180)

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
    }, 604800000)

    // Iniciando Música

    global.star.music.init(global.star.user.id)
  }
}
