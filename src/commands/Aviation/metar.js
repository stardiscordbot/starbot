module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'metar',
          categoria: '✈️ • Aviação',
          desc: 'Mostra o clima em algum aeroporto'
        },
        en: {
          nome: 'metar',
          categoria: '✈️ • Aviation',
          desc: 'Shows the weather at an airport'
        },
      aliases: ['weather', 'tempo', 'clima'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const keys = require("../../config/json/keys.json")
        const fetch = require("node-fetch");
        const options = {
          headers: {'X-API-Key': keys.av}
        };
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Insira o icao do aeroporto, exemplo \`s!metar SBRJ\``)
        fetch(`https://api.checkwx.com/metar/${args[0]}/decoded`, options)
        .then(res => res.json())
        .then(json => {
        json.data.map(met => {
        let ember = new (require("discord.js")).MessageEmbed()
        .setColor("BLUE")
        .setDescription(`> Informações do aeroporto:\n\n**🛩️ ICAO:** ${met.icao}\n**🧑‍✈️ Flight Rule:** ${met.flight_category}`)
        message.quote(message.author, ember)
        })
        })
    }
  }
  
  //ADG