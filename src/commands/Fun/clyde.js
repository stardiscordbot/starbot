const {MessageAttachment} = require('discord.js');
const fetch = require('node-fetch');

module.exports = class Command {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'clyde',
          categoria: '🤣 • Fun',
          desc: 'Faça uma montagem com o nosso querido Clyde'
        },
        en: {
          nome: 'clyde',
          categoria: '🤣 • Fun',
          desc: 'Make a montage with our dear Clyde'
        },
      aliases: [],
      run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {
  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`:x: ${message.author}, ${idioma.cmm.text}`);
        }
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new MessageAttachment(json.message, "clyde.png");
            message.quote(attachment);
  }
}