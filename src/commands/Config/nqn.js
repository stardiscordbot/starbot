module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
          bot: ['MANAGE_WEBHOOKS', 'MANAGE_MESSAGES'], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'nqn',
          categoria: '⚙️ • Config',
          desc: 'Ativa o not-quite-nitro'
        },
        en: {
          nome: 'nqn',
          categoria: '⚙️ • Config',
          desc: 'Activates not-quite-nitro'
        },
      aliases: ['nqn', 'notquitenitro', 'not-quite-nitro', 'n-q-n'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

        if(!args[0]) return message.quote(`aff, ativa ou desativa`)
        if(args[0] == "on") {
            message.react("✔️")
            client.db.set(`nqn-${message.guild.id}`, "true")
        }

        if(args[0] == "off") {
            message.react("✔️")
            client.db.delete(`nqn-${message.guild.id}`)
        }

    }
  }
  
  //Nome de quem fez ou ajudou