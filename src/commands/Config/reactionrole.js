module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: ['MANAGE_ROLES'], //Permissoes que o usuario necessita
          bot: ['MANAGE_ROLES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'reactionrole',
          categoria: '⚙️ • Config',
          desc: 'Descrição'
        },
        en: {
          nome: 'reactionrole',
          categoria: '(Emoji) Testing',
          desc: 'Description'
        },
      aliases: ['rr', 'normal', 'reaction-role'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
      
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)

        const emoji = args[1];
        if (!emoji) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)

            client.rr.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type:1
            });

    }
  }
  
  //ADG