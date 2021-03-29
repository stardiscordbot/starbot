const fetch = require("node-fetch");

module.exports = class Command {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: [], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'cat',
        categoria: '🤣 • Fun',
        desc: 'Cat !!!!!!!'
      },
      en: {
        nome: 'cat',
        categoria: '🤣 • Fun',
        desc: 'Cat !!!!!!'
      },
    aliases: ['kitty'],
    run: this.run
  }
}

async run(client, message, args, prefixoCerto, idioma) {

    fetch('http://aws.random.cat//meow')
    .then(res => res.json())
    .then(json => message.quote({"embed": {
      "url": "https://discordapp.com",
      "color": 11733342,
      "image": {
        "url": json.file
      }
     
    }}));

  }

}
