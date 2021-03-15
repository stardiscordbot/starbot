module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'nodes',
          categoria: '🎵 • Musica',
          desc: 'Descrição'
        },
        en: {
          nome: 'nodes',
          categoria: '🎵 • Music',
          desc: 'Description'
        },
      aliases: ['node', 'nodesinfo'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

        const API = require("../../../utils/API")

        let node = client.manager.nodes.get("PANAM")
        let embed = new (require("discord.js")).MessageEmbed()
        embed.setColor("F47FFF")
        embed.setDescription(`\`\`\`diff\n\n- [ PANAM ]
    --- Uptime ${node.stats.uptime === 0 ? 'Offline' : API.time2(node.stats.uptime)}
    --- Players ${node.stats.playingPlayers}
    --- ${idioma.nodes.memoria} ${API.bytes(node.stats.memory.used).value}${API.bytes(node.stats.memory.used).unit}\`\`\``)
        message.quote(embed)

    }
  }
  
  //Nome de quem fez ou ajudou