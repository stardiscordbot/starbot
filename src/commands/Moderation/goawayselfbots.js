module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['banMembers'], // Permissoes que o usuario necessita
        bot: ['banMembers'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'selfbots',
        categoria: '🔨 • Moderação',
        desc: 'Veja a informação de algum ban'
      },
      en: {
        nome: 'selfbots',
        categoria: '🔨 • Moderation',
        desc: 'View a baninfo'
      },
      aliases: ['goawayselfbots', 'floppapower', 'self'],
      run: this.run
    }
  }

  async run (ctx) {
    const csv = require('csv-parser')
    const fs = require('fs')
    ctx.send(`⏰ ${ctx.message.author.mention} **|** ${ctx.idioma.self.des}`)
    fs.createReadStream('./src/blocked_users.csv')
      .pipe(csv())
      .on('data', (row) => {
        ctx.message.channel.guild.banMember(row.user).catch((e) => console.log(e))
      })
      .on('end', () => {
        ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.self.done.replace('%p', ctx.prefix)}`)
      })
  }
}
module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['banMembers'], // Permissoes que o usuario necessita
        bot: ['banMembers'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'selfbots',
        categoria: '🔨 • Moderação',
        desc: 'Veja a informação de algum ban'
      },
      en: {
        nome: 'selfbots',
        categoria: '🔨 • Moderation',
        desc: 'View a baninfo'
      },
      aliases: ['goawayselfbots', 'floppapower', 'self'],
      run: this.run
    }
  }

  async run (ctx) {
    const csv = require('csv-parser')
    const fs = require('fs')
    ctx.send(`⏰ ${ctx.message.author.mention} **|** ${ctx.idioma.self.des}`)
    fs.createReadStream('./src/blocked_users.csv')
      .pipe(csv())
      .on('data', (row) => {
        ctx.message.channel.guild.banMember(row.user).catch((e) => console.log(e))
      })
      .on('end', () => {
        ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.self.done.replace('%p', ctx.prefix)}`)
      })
  }
}
