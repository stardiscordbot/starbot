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
          desc: 'Cria um Reaction Role onde membros podem ganhar determinados cargos reagindo na mensagem determinada'
        },
        en: {
          nome: 'reactionrole',
          categoria: '⚙️ • Config',
          desc: 'Creates a Reaction Role where members can win certain positions by reacting on the given message'
        },
      aliases: ['rr', 'reaction-role'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {

        if(!args[0]) return message.quote({embed: {
          color: 16711680,
          title: `${client.user.username} | ReactionRoles`,
          description: `${idioma.rr.desc}`,
          fields: [{
              name: "[1] Normal:",
              value: idioma.rr.normal
            },
            {
              name: "[2] Toggle:",
              value: idioma.rr.toggle
            },
            {
              name: "[3] Delete:",
              value: idioma.rr.delete
            }
          ],
        }
      })

        if(args[0].toLowerCase() == "normal") { 
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)

        const emoji = args[2];
        if (!emoji) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)

        const msg = await message.channel.messages.fetch(args[3] || message.id);
        if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)
            client.rr.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type:1
            });
          message.react("✔️")
        }

        if(args[0].toLowerCase() == "toggle") { 
          const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
          if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)
  
          const emoji = args[2];
          if (!emoji) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)
  
          const msg = await message.channel.messages.fetch(args[3] || message.id);
          if (!role) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs.replace("%p", prefixoCerto)}`)
              client.rr.createReactionRole({
              message: msg,
              roles: [role],
              emoji,
              type:2
              });
            message.react("✔️")
          }

          if(args[0].toLowerCase() == "delete") { 
            const emoji = args[1];
            if (!emoji) return message.quote(`:x: ${message.author} **|** ${idioma.rr.noargs2.replace("%p", prefixoCerto)}`)
    
            const msg = await message.channel.messages.fetch(args[2]);
    
            await client.rr.deleteReactionRole({message: msg, emoji});
              message.react("✔️")
            }

    }
  }
  
  //ADG