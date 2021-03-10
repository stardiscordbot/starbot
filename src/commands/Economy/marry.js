module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'casar',
          categoria: '(Emoji) Testes',
          desc: 'Descrição'
        },
        en: {
          nome: 'marry',
          categoria: '(Emoji) Testing',
          desc: 'Description'
        },
      aliases: ['marry', 'casar'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
    
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Você precisa mencionar alguém para poder casar`);

        const marry = message.mentions.members.first() || await client.users.fetch(args[0]);

        message.quote(`💍 ${message.author} **|** ${marry}, ${message.author} deseja se casar com você, você aceita?`)
    }
  }
  
  //ADG