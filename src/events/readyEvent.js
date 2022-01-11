module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'ready',
      type: 'once',
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
      `Join in my support server discord.gg/zqUYWTJqXK | ${global.star.user.username} [v${version}]`,
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
      const backupchannel = await global.star.getRESTChannel('930492855171051550')
      const { readFile } = require('fs')
      const util = require('util')
      const read = util.promisify(readFile)
      const moment = require('moment')

      backupchannel.createMessage(`<:ES_cpu:815580080959914065> Backup do banco de dados (principal)! | ${moment().format('DD/MM/YYYY | h:mm:ss')}`, {
        file: await read('./data/base.json'),
        name: 'base.json'
      })

      backupchannel.createMessage(`<:ES_cpu:815580080959914065> Backup do banco de dados (sorteios)! | ${moment().format('DD/MM/YYYY | h:mm:ss')}`, {
        file: await read('./data/giveaways.json'),
        name: 'giveaways.json'
      })
    }, 60000)

    // Iniciando Música

    global.star.music.init(global.star.user.id)
  }
}
