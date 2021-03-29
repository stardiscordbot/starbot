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
        nome: 'dog',
        categoria: '🤣 • Fun',
        desc: 'Dog !!!!!! '
      },
      en: {
        nome: 'dog',
        categoria: '🤣 • Fun',
        desc: 'Dog !!!!!'
      },
    aliases: ['doggo', 'shiba'],
    run: this.run
  }
}

async run(client, message, args, prefixoCerto, idioma) {

    fetch("https://random.dog/woof.json")
    .then(res => res.json())
    .then(json => {message.quote({"embed": {
        "url": "https://discordapp.com",
        "color": 11733342,
        "image": {
          "url": json.url
        }
       
      }})})
}
}
