module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: true
        },
        pt: {
          nome: 'dbbackup',
          categoria: '💻 • Desenvolvedor',
          desc: 'Faz um backup da database'
        },
        en: {
          nome: 'dbbackup',
          categoria: '💻 • Developer',
          desc: 'Make a database backup'
        },
        aliases: ['backup', 'database', 'db'],
        run: this.run
      }
    }
    async run(ctx) {
        const backupchannel = await star.getRESTChannel("850788451359522857")
        const {readFile} = require("fs")
        const util = require("util")
        const read = util.promisify(readFile)
        backupchannel.createMessage(`<:st_host:830841046153691197> Backup do banco de dados! // Backup feito por: ${ctx.message.author.mention}`, {
            file: await read("./data/base.json"),
            name: "base.json"
        })
        const embed = new star.manager.ebl;
        embed.title('<:st_host:830841046153691197> Banco de Dados')
        embed.description(`**${ctx.message.author.username}**, fiz o backup do banco de dados, ele foi enviado no meu servidor principal (aonde fica ligado os sistemas, **NÃO É O SERVIDOR DE SUPORTE**, para saber mais vá para o canal (<#850788451359522857> [\`${backupchannel.name}\`])).`)
        embed.thumbnail(star.user.avatarURL)
        embed.color('#dd3af0')
        ctx.send(embed.create)
  }
}
  
  // LRD